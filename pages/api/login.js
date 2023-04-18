// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == "POST") {
        try {

            let user = await User.findOne({ "email": req.body.email })
            if (user) {
                if (req.body.email == user.email && req.body.password == user.password) {
                    res.status(200).json({ success: true, user: user.email, name: user.name });
                } else {
                    res.status(200).json({ success:false, error: "Invalid credentials" });
                }
            } else {
                res.status(200).json({ success: false, error:"No user found" });
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