import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		let jwtData = jwt.verify(req.body.token, JWT_SECRET);
		let user = await User.findById(jwtData.user.id)
		res.status(200).json({success:"User get successfully",data:user});	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);