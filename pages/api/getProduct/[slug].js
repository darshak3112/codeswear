// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/Product"
import connectDB from "../../../middleware/mongoose"
import mongoose from "mongoose"

const handler = async (req, res) => {
    try {
        let error = null;
        let product = await Product.findOne({ slug: req.query.slug });

        if (product == null) {
            res.status(200).json({ error: 404 })

        }
        let variants = await Product.find({
            title: product.title,
            category: product.category,
        });
        let colorSizeSlug = {};
        for (let item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = { slug: item.slug };
            } else {
                colorSizeSlug[item.color] = {};
                colorSizeSlug[item.color][item.size] = { slug: item.slug };
            }
        }
        res.status(200).json({ error, product, variants })

    } catch (error) {
        console.log(error);
    }

}

mongoose.models = {}
export default connectDB(handler)