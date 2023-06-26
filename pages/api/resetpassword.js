import connectDb from '../../middleware/mongoose'
import User from '../../models/User'
var CryptoJS = require("crypto-js");
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('forgotToken','Forgot token is required').notEmpty(),
		check('password','Password should be min 6 char').isLength({ min: 6 }),
		check('cpassword', 'Cpassword should be min 6 char').isLength({ min: 6 })
          .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Password doesn't match");
          }
          return true;
       }),
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		// check validation
		await validateBody(req, res)
		
		if(req.body.password != req.body.cpassword) {
			res.status(400).json({error:"Password not match"});
		}
		let user = await User.findOne({forgot_token:req.body.forgotToken})
		if(user) {
			user.password = CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()
			user.forgot_token = null
			await user.save();
			res.status(200).json({success:"Password update successfully"});
		} else {
			res.status(400).json({error:"Forgot token not found"});
		}	
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);