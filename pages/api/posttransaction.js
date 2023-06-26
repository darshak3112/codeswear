import Order from '../../models/Order'
import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
var PaytmChecksum = require("paytmchecksum");
 
const handler = async(req,res) =>{
	// check patym checksum
	var paytmChecksum = '';
	var patymParams = {}
	
	const received_data = req.body;
	for (var key in received_data) {
		if(key == 'CHECKSUMHASH'){
		  paytmChecksum = received_data[key]	
		} else {
		  patymParams[key] = received_data[key]	
		}
	}
	var isVerifySignature = PaytmChecksum.verifySignature(patymParams, process.env.NEXT_PUBLIC_PAYTM_MKEY, paytmChecksum);
	if (!isVerifySignature) {
		return res.status(500).json({"error":"paytm checksum not match"})
	}
	// order data set
	let order = await Order.findOne({orderId:req.body.ORDERID});
	if(order) {
		let status;
		let paidAt = null;
		if(req.body.STATUS == 'TXN_SUCCESS') {
			status = 'success';
			paidAt = req.body.TXNDATE;
		} else if(req.body.STATUS == 'PENDING') {
			status = 'pending';
		} else {
			status = 'failed';
		}
		order.status = status;
		order.tansactionId = req.body.TXN_TOKEN ? req.body.TXN_TOKEN : req.body.TXNID;
		order.paymentInfo = JSON.stringify(req.body);
		order.paidAt = paidAt;
		await order.save();
		// set available qty
		if(status == 'success') {
			let products = order.products
			for(let item in products) {
				await Product.findOneAndUpdate({slug:item},{$inc: {availableQty:-products[item].qty}})
			}
		}
		return res.redirect('/order?cartClear=1&id='+order._id,200)
	} else {
		return res.status(400).json({ error: 'order not found' })
	}
}
export default connectDb(handler);
