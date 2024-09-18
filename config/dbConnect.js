const mongoose = require ('mongoose')
const dbConnect = async() =>{
    try{
       await mongoose.connect(process.env.MONGO_URL )
       console.log('connected to database ')
    }catch (error) {
        console.error('Error connecting to database')
    }
}
module.exports = dbConnect