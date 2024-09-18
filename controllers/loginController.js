const User = require ('../models/userModels')
const jwt= require ('jsonwebtoken')
const  loginControllers = async(req,res) =>{
   try {
    const {email , password} = req.body
    const user = await User.findOne ({email})
    if(!user) return res.status(400).json({
      messsage:'inavlid email or password'
    })
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.status(200).json({token})
   } catch (error) {
    res.status(500).json({
      error:error.messsage
    })
    
   }
      

}
module.exports = loginControllers 