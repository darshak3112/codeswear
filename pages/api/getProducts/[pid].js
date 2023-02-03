// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/Product"
import connectDB from "../../../middleware/mongoose"
import mongoose from "mongoose"

const handler = async (req, res) => {
    try {
        const { pid } = req.query
        console.log(pid);
        let products = await Product.find({ category: pid })
        res.status(200).json({ products })
    } catch (error) {
        console.log(error);
    }

}

mongoose.models = {}
export default connectDB(handler)