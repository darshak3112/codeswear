const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
	phone:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
    },
	address:{
        type:String,
        default:''
    },
	pincode:{
        type:String,
        default:''
    },
	forgot_token:{
		type:String,
		default:null
	},
	role:{
		type:String,
		default:'user'
	}
	
},{
    timestamps:true
})

mongoose.models = {}
export default mongoose.model('User',userSchema);