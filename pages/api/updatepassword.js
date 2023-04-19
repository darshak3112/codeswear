import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
import User from "../../models/User"
import cryptoJS from "crypto-js"


const handler=async(req, res)=>{
    if(req.method=='POST'){
        let token=req.body.token
        let user=jsonwebtoken.verify(token,process.env.NEXT_PUBLIC_JWT_SECRET)
        //console.log(user)
        let dbuser=await User.findOne({email:user.email})
        const bytes=cryptoJS.AES.decrypt(dbuser.password, process.env.NEXT_PUBLIC_AES_SECRET);
    
        let decryptedPass=(bytes.toString(cryptoJS.enc.Utf8))
        //console.log(decryptedPass)
        //let dbuseru=await User.findOneAndUpdate({email:dbuser.email},{password: cryptoJS.AES.encrypt("req.body.password",process.env.NEXT_PUBLIC_AES_SECRET).toString()})
        if(decryptedPass==req.body.password && req.body.npassword==req.body.cpassword){
       
        let dbuseru=await User.findOneAndUpdate({email:dbuser.email},{password: cryptoJS.AES.encrypt(req.body.cpassword,process.env.NEXT_PUBLIC_AES_SECRET).toString()})
        //console.log(dbuser)
        res.status(200).json({success:true})
        return
        }
        res.status(200).json({success:false})
    }
    else{
        res.status(400).json({error:"error"})
    }
     
        
        
       
        
      
}
export default connectDb(handler)