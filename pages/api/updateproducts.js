import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import protectedMiddleware from '../../middleware/protected-middleware'
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('title','Title is required').notEmpty(),
		check('slug','Slug is required').notEmpty().custom((value,{req}) => {
          return Product.findOne({ slug: value,_id:{ $ne: req.body._id } }).then((product) => {
            if (product) {
              return Promise.reject('Slug already exits');
            }
          });
        }),
		check('category','Catgory is required').notEmpty(),
		check('price','Price between 1 to 10000').notEmpty().isInt({ min: 1, max: 10000}),
		check('availableQty','AvailableQty between 1 to 100').isInt({ min: 1, max: 100}),
		check('size','Size is required').notEmpty(),
		check('color','Color is required').notEmpty(),
		check('desc','Desc is required').notEmpty(),
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		protectedMiddleware(req,res)
		// check validation
		await validateBody(req, res)
		/*for(let i=0;i<req.body.length;i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }*/
		let p = await Product.findByIdAndUpdate(req.body._id,req.body)
        res.status(200).json({success:"Product updated successfully"});
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);