const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
	productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
	
},{
    timestamps:true
})

mongoose.models = {}
export default mongoose.model('Wishlist',wishlistSchema);