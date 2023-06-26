import Order from '../../models/Order'
import connectDb from '../../middleware/mongoose'
import protectedMiddleware from '../../middleware/protected-middleware'
 
const handler = async(req,res) =>{
	protectedMiddleware(req,res)
	//if(req.method == 'POST') {
		let order = await Order.findOne().sort({deliveredAt:-1});
		let activities = [];
		if(order) {
			activities = [
			  {
				time: new Date(order.deliveredAt).toLocaleString(),
				color: "secondary.main",
				text: "Order delivered at"
			  },
			  {
				time: new Date(order.paidAt).toLocaleString(),
				color: "success.main",
				text: "Order paid at"
			  },
			  {
				time: new Date(order.createdAt).toLocaleString(),
				color: "secondary.main",
				text: "Order created at",
			  },
			];
		}
		let currentYear = new Date().getFullYear();
		let saleDate = new Date(currentYear+'-01-01');
		
		let sales = await Order.aggregate([
			{$match: {
				"createdAt": { $gte: saleDate},
				"paidAt": {$ne: null}
			}},
			{$group: {
				_id: {$month: "$createdAt"}, 
				count: {$sum: 1} 
			}}
		]);
		let deliveries = await Order.aggregate([
			{$match: {
				"createdAt": { $gte: saleDate},
				"deliveredAt": {$ne: null}
			}},
			{$group: {
				_id: {$month: "$createdAt"}, 
				count: {$sum: 1} 
			}}
		]);
		
		let saleData = [0,0,0,0,0,0,0,0,0,0,0,0];
		sales.map((sale)=>{
			saleData[sale._id-1] = sale.count;
		})
		let deliveryData = [0,0,0,0,0,0,0,0,0,0,0,0];
		deliveries.map((deliver)=>{
			deliveryData[deliver._id-1] = deliver.count;
		})
		res.status(200).json({ success: 'dashboard dat get succesfully',activities,saleData,deliveryData,currentYear})
 	/*} else {
		return res.status(500).json({ error: 'method not found' })
	}*/
	
}
export default connectDb(handler);
