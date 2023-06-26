import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisgoodb$oy';
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('password','Password is required').notEmpty(),
		check('npassword','New passowrd min 6 char').isLength({ min: 6}),
		check('cpassword','Confirm passowrd min 6 char').isLength({ min: 6}),
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		// check validation
		await validateBody(req, res)
		let jwtData = jwt.verify(req.body.token, JWT_SECRET);
		let dbUser = await User.findById(jwtData.user.id);
		if(dbUser) {
			// decrypt login user password
			const bytes  = CryptoJS.AES.decrypt(dbUser.password, 'secret123');
			let decryptPassword = bytes.toString(CryptoJS.enc.Utf8);
			
			// check login user password is matched
			if(decryptPassword != req.body.password) {
				return res.status(400).json({error:"Password not match to login user"});
			}
			// check new and confirm password is matched
			if(req.body.cpassword != req.body.npassword) {
				return res.status(400).json({error:"New and confirm password noy match"});	
			}
			// update user password
			let updatedUser = await User.findOneAndUpdate({_id:jwtData.user.id},{password:CryptoJS.AES.encrypt(req.body.npassword, 'secret123').toString()});
			res.status(200).json({success:"password update successfully",data:updatedUser});	
		} else {
			res.status(400).json({error:"User not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);