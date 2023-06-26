import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose'
import protectedMiddleware from '../../middleware/protected-middleware'
 
const handler = async(req,res) =>{
	protectedMiddleware(req,res)
	let order = await Order.findById(req.body.id);
	if(order) {
		order.deliveryStatus = 'delivered';
		order.deliveredAt = new Date();
		await order.save();
		return res.status(200).json({ success: 'order delivered status update' })
	} else {
		return res.status(400).json({ error: 'order not found' })
	}
}
export default connectDb(handler);
