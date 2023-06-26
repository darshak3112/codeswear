const https = require('https');
const PaytmChecksum = require("paytmchecksum");
import Order from '../../models/Order'
import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import pincodes from '../../pincode.json'
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('name','Name is required').notEmpty(),
		check('email','Email must be valid').isEmail(),
		check('phone','Phone should be 10 digit').isInt({min:1}).isLength({ min: 10, max: 10}),
		check('pincode','Pincode should be 6 digit').isInt().isLength({ min: 6, max: 6}),
		check('address','Address is required').notEmpty(),
    ], validationResult)
)

//export default async function handler(req, res) {
const handler = async(req,res) =>{
	
	// check validation
	await validateBody(req, res)
	
	// check if pincode is not serviceable
	if(!Object.keys(pincodes).includes(req.body.pincode)) {
		res.status(400).json({success:false,error:'Pincode is not serviceable',cartClear:false})
	   return
	}
 	
	// check if cart total is empty
    if(req.body.subTotal <=0){
	   res.status(400).json({success:false,error:'Cart empty. Pls add to cart product and checkout',cartClear:false})
	   return
    }
	// check if cart is tempered or any changes in cart item
	let cart = req.body.cart;
	let product,cartTotal = 0;
	
    for(let item in cart) {
		product = await Product.findOne({slug:item})
		cartTotal += cart[item].price*cart[item].qty
		// check if price change
		if(product.price != cart[item].price) {
			res.status(400).json({success:false,error:'Some product price have changed',cartClear:true})
			return
		}
		// check if qty available
		if(product.availableQty < cart[item].qty) {
			res.status(400).json({success:false,error:'Some product out of stock',cartClear:true})
			return
		}
	}
	if(cartTotal != req.body.subTotal) {
		res.status(400).json({success:false,error:'Some product price have changed. Subtotal not matched',cartClear:true})
		return
	}
	// check if the user deatils is valid
	if(req.body.phone.length != 10 || !Number.isInteger(Number(req.body.phone))) {
		res.status(400).json({success:false,error:'Enter 10 digits phone no',cartClear:false})
		return
	}
	if(req.body.pincode.length != 6 || !Number.isInteger(Number(req.body.pincode))) {
		res.status(400).json({success:false,error:'Enter 6 digits pincode',cartClear:false})
		return
	}
	
	// save an order via orderId
	let orderData = new Order({
		email:req.body.email,
		orderId:req.body.oid,
		products:req.body.cart,
		amount:req.body.subTotal,
		address:req.body.address
	});
	await orderData.save();
	// generate transcation token
	var paytmParams = {};
	paytmParams.body = {
	    "requestType"   : "Payment",
	    "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
	    "websiteName"   : "YOUR_WEBSITE_NAME",
	    "orderId"       : req.body.oid,
	    "callbackUrl"   : '/api/posttransaction',
	    //"callbackUrl"   : 'http://localhost:3000/api/posttransaction',
	    "txnAmount"     : {
	        "value"     : req.body.subTotal,
	        "currency"  : "INR",
	    },
	    "userInfo"      : {
	        "custId"    : req.body.email,
	    },
	};
	const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.NEXT_PUBLIC_PAYTM_MKEY)
	
    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

	// make function 
	const requestAsync = async() =>{
		return new Promise((resolve,reject) =>{
			var options = {
	          /* for Staging */
	          hostname: 'securegw-stage.paytm.in',
	          /* for Production */
	          // hostname: 'securegw.paytm.in',
	          port: 443,
	          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
	          method: 'POST',
	          headers: {
	            'Content-Type': 'application/json',
	            'Content-Length': post_data.length
	          }
		    };
		    var response = "";
		    var post_req = https.request(options, function(post_res) {
		        post_res.on('data', function (chunk) {
		            response += chunk;
		        });

		        post_res.on('end', function(){
		            //resolve(JSON.parse(response).body)
					let result = JSON.parse(response).body
					result.success = true;
					result.cartClear = false;
					resolve(result)
		        });
		    });
		    post_req.write(post_data);
		    post_req.end();	
		});
	}
	
	let myr = await requestAsync();
	return res.status(200).json(myr)
}
export default connectDb(handler);
