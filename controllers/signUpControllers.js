const User = require('../models/userModels')
const bcrypt = require ('bcrypt')
const signUp = async(req,res) =>{
    try{
           const {email ,password} = req.body
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new User ({email,password:hashedPassword})
            await newUser.save()
            
            res.status(200).json({message:'User created successfully '})
      }catch (error) {
       res.status(400).json({error:error.message})
      }
}
module.exports=signUp