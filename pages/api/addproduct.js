// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
    
    if (req.method == "POST") {
        try {
            console.log(Object.keys( req.body).length)
            for (let i = 0; i < Object.keys( req.body).length; i++) {
                console.log(i);
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQty: req.body[i].availableQty,
                });
                await p.save();
            }
            res.status(200).json({ success: "success" });
        }catch (e) {
            console.log("error ",e);
        }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};
export default connectDB(handler);