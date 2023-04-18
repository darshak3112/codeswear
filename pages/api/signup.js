// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == "POST") {
        try {
            console.log(req.body);
            let u = new User(req.body);
            await u.save();
            res.status(200).json({ success: "success" });
        } catch (e) {
            res.status(400).json({ error: "This method is not allowed" });
            console.log("error ", e);
        }
    } else {
        res.status(400).json({ error: "This method is not allowed" });
    }
};
export default connectDB(handler);