const User = require('../models/userModels')
const jwt= require ('jsonwebtoken')
const  sendRequestPasswordEmail = require ('../services/resendServices')
const requestPassword = async(req,res) =>{
    try{
    const {email} = req.body
    const user = await User.findOne ({email})
    if(!user) 
        return res.status(400).json({
    message:'user not found'
    })

    const resetToken = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      user.resetToken = resetToken
      user.resetTokenexpiration = Date.now()+15*60*1000
      await user.save()

      await  sendRequestPasswordEmail (email,resetToken)
     res.status(200).json({message:'password rest link sent to your email'})

    }catch(error){
    res.status(400).json({
        message:'error sending email'
    })
}
}
module.exports = requestPassword