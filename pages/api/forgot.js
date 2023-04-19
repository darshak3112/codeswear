import Forgot from "../../models/Forgot"
import User from "../../models/User"

export default async function handler(req, res) {
    //Check if the user exist in the database
    //Send an email to the user
    if(req.body.sendMail){

    
    let token=`yfhhjuiklilll`
    let forgot=new Forgot({
        email:req.body.email,
        token:token
    })
    let email= `We have sent you this email in response to your request to reset your password on codeswear.com. 

   

    To reset your password, please follow the link below:

    <a href="https://codeswear.com/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone. If you feel your password has been compromised, you can change it by going to your  My Account Page and clicking on the "Change Your Password" link.

    <br/><br/>

    If you need help, or you have any other questions, feel free to email codeswear@gmail.com, or call 9748312831 customer service toll-free at 1100-1230-1345.

    <br/><br/>`}
    else{
        //Reset User password
    }
    res.status(200).json({ success:true })
  }