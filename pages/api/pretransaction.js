import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
const https = require("https");
import pincodes from '../pincodes.json'


const PaytmChecksum = require("paytmChecksum");

const handler = async (req, res) => {
  if (req.method == "POST") {
    
    //Check if the pincode is serviceable
    if(!(Object.keys(pincodes).includes(req.body.pincode))){
      res.status(200).json({success:false,"error":"The pincode you've entered is not serviceable",cartClear:false})
      return
    }
    //Check if the cart is tampered
    let product,sumTotal=0;
    let cart=req.body.cart;
    if(req.body.subTotal<=0){
      res.status(200).json({success:false,"error":"Cart is empty! Please build your cart and try again!",cartClear:false})
      return
    
    }
    for(let item in cart){
      console.log(item)
      sumTotal+=cart[item].price * cart[item].qty
      product=await Product.findOne({slug:item})
      //Check if the cart items are out of stock
     
      if(product.availableQty<cart[item].qty){
        res.status(200).json({success:false,"error":"Some items in your cart went out of stock.Please try again!",cartClear:true})
        return
      }
      if(product.price !=cart[item].price){
        res.status(200).json({success:false,"error":"The price of some items in your cart have changed. Pease try again...",cartClear:true})
        return
      }
    }
    if(sumTotal!==req.body.subTotal){
      res.status(200).json({success:false,"error":"The price of some items in your cart have changed. Pease try again...",cartClear:true})
      return
    }
    
    //Check the details are valid
    if(req.body.phone.length!==10 || !Number.isInteger(Number(req.body.phone))){
      res.status(200).json({success:false,"error":" Please enter your 10-digit Phone No.",cartClear:false})
      return
    }
    if(req.body.pincode.length!==6 || !Number.isInteger(Number(req.body.pincode))){
      res.status(200).json({success:false,"error":" Please enter your 6-digit Pincode",cartClear:false})
      return
    }
    //Initiate an order corresponding to this order id
    
    let order=new Order({
        email:req.body.email,
        orderId:req.body.oid,
        address:req.body.address,
        state:req.body.state,
        district:req.body.district,
        pincode:req.body.pincode,
        phone:req.body.phone,
        name:req.body.name,
        amount:req.body.subTotal,
        products:req.body.cart
    })
    await order.save()
 

    //Insert an entry in the Orders table with status as pending
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum=await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.NEXT_PUBLIC_PAYTM_MKEY
    )
      paytmParams.head = {
        signature: checksum,
      };

      var post_data = JSON.stringify(paytmParams);

      const requestAsync=async ()=>{
        return new Promise((resolve,reject)=>{
            var options = {
                /* for Staging */
                // hostname: "securegw-stage.paytm.in",
        
                /* for Production */
                 hostname: 'securegw.paytm.in',
        
                port: 443,
                path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": post_data.length,
                },
              };
        
              var response = "";
              var post_req = https.request(options, function (post_res) {
                post_res.on("data", function (chunk) {
                  response += chunk;
                });
        
                post_res.on("end", function () {
                  //console.log("Response: ", response);
                  let ress=JSON.parse(response).body
                  ress.success=true
                  ress.cartClear=false
                  resolve(ress)
                });
              });
        
              post_req.write(post_data);
              post_req.end();
        })
      }
     let myr= await requestAsync()
     res.status(200).json(myr)
    
   }
}
export default connectDb(handler);