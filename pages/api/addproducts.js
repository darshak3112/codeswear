import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import protectedMiddleware from '../../middleware/protected-middleware'
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
    validateMiddleware([
        check('data.*.title','Title is required').notEmpty(),
		check('data.*.slug','Slug is required').notEmpty().custom((value) => {
          return Product.findOne({ slug: value }).then((product) => {
            if (product) {
              return Promise.reject('Slug already exits');
            }
          });
        }),
		check('data.*.desc','Desc is required').notEmpty(),
		check('data.*.category','Catgory is required').notEmpty(),
		check('data.*.size','Size is required').notEmpty(),
		check('data.*.color','Color is required').notEmpty(),
		check('data.*.price','Price between 1 to 10000').notEmpty().isInt({ min: 1, max: 10000}),
		check('data.*.availableQty','AvailableQty between 1 to 100').isInt({ min: 1, max: 100})
    ], validationResult)
)

const handler = async(req,res) =>{
    if(req.method == 'POST') {
		protectedMiddleware(req,res)
		// check validation
		await validateBody(req, res)
		
		if(req.body.data) {
			let reqData = req.body.data;
			for(let i=0;i<req.body.data.length;i++) {
				let p = new Product({
					title:reqData[i].title,
					slug:reqData[i].slug,
					desc:reqData[i].desc,
					img:reqData[i].img ? req.body[i].img :'https://m.media-amazon.com/images/I/51QeCqn2+9L._AC_UL320_.jpg',
					category:reqData[i].category,
					size:reqData[i].size,
					color:reqData[i].color,
					price:reqData[i].price,
					availableQty:reqData[i].availableQty    
				})
				await p.save();
			}
		}
        res.status(200).json({success:"Product added successfully"});
    } else {
        res.status(200).json({error:"Method not allowed"});
    }
}
export default connectDb(handler);