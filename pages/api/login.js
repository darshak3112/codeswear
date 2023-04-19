// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


const handler = async (req, res) => {

    if (req.method == "POST") {
        try {

            let user = await User.findOne({ email: req.body.email });
            const bytes = CryptoJS.AES.decrypt(user.password,process.env.NEXT_PUBLIC_AES_SECRET);
            let decryptedPass = (bytes.toString(CryptoJS.enc.Utf8))

            if (user) {
                if (req.body.email == user.email && req.body.password == decryptedPass) {
                    let token = jwt.sign({ user: user.email, name: user.name },process.env.NEXT_PUBLIC_JWT_SECRET, { expiresIn: "2d" });
                    res.status(200).json({ success: true, token });
                } else {
                    res.status(200).json({ success: false, error: "Invalid credentials" });
                }
            } else {
                res.status(200).json({ success: false, error: "No user found" });
            }
        } catch (e) {
            res.status(400).json({ error: "This method is not allowed" });
            console.log("error ", e);
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};
export default connectDB(handler);