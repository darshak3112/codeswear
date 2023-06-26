import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'

const handler = async(req,res) =>{
	console.log('in product details api')
    let product = await Product.findById(req.body.id);
    res.status(200).json({sucess:'product fetch successfully',data:product});
}
export default connectDb(handler);