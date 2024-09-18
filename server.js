require('dotenv').config()
const express = require ('express')
const app = express ()



const dbConnect = require ('./config/dbConnect')
const authRoutes = require('./Router/authRoutes')

dbConnect()

app.use(express.json());

app.use('/auth', authRoutes);

const crypto = require ('crypto')


const secret  = crypto.randomBytes(50).toString('hex')
console.log(secret)

app.listen(3400,() => {
    console.log('server running on port 3400')
})