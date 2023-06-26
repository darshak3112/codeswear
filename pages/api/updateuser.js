import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('name','Name is required').notEmpty(),
		check('phone','Phone should be 10 digit').isInt({min:1}).isLength({ min: 10, max: 10}),
		check('pincode','Pincode should be 6 digit').isInt().isLength({ min: 6, max: 6}),
		check('address','Address is required').notEmpty(),
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		// check validation
		await validateBody(req, res)
		let jwtData = jwt.verify(req.body.token, JWT_SECRET);
		let user = await User.findOneAndUpdate({_id:jwtData.user.id},{name:req.body.name,phone:req.body.phone,address:req.body.address,pincode:req.body.pincode})
		if(user) {
			res.status(200).json({success:"User update successfully",data:user});	
		} else {
			res.status(400).json({error:"User not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);