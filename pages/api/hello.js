// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/mongoose";
import Product from "../../models/Product"



const handler = async (req, res) => {
  let p = await Product.find();
  console.log(p);
    res.status(200).send("ok")
};
export default connectDB(handler);
