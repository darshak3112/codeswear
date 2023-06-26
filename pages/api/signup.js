import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('name','Name is required').notEmpty(),
		check('password','Password should be min 6 char').isLength({ min: 6 }),
		check('email','Email must be valid').isEmail()
		  .custom((value) => {
			return User.findOne({ email: value }).then((user) => {
			  if (user) {
				return Promise.reject('Email already exits');
			  }
			});
		  }),
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
        console.log('in api',req.body)
		// check validation
		await validateBody(req, res)
        let u = new User({
            name:req.body.name,
            email:req.body.email,
            password:CryptoJS.AES.encrypt(req.body.password, 'secret123').toString()
        })   
        await u.save();
        res.status(200).json({success:"User signup successfully"});
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);