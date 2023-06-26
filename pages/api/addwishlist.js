import Wishlist from '../../models/Wishlist'
import connectDb from '../../middleware/mongoose'
 
const handler = async(req,res) =>{
	let wishlistExits = await Wishlist.findOne({userId:req.body.userId,productId:req.body.productId});
	if(wishlistExits) {
		await wishlistExits.remove();
		return res.status(200).json({ success: 'wishlist remove successfully' })
	} else {
		let wishlist = new Wishlist({
			userId:req.body.userId,
			productId:req.body.productId
		});
		await wishlist.save();
		return res.status(200).json({ success: 'wishlist added successfully' })	
	}
}
export default connectDb(handler);
