// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {

    if (req.method == "POST") {
        try {
            const { name, email, password } = req.body;
            let u = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.NEXT_PUBLIC_AES_SECRET).toString() });
            await u.save();
            res.status(200).json({ success: true });
        } catch (e) {
            res.status(400).json({ error: "This method is not allowed" });
            console.log("error ", e);
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};
export default connectDB(handler);