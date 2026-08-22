let dotenv = require('dotenv')
dotenv.config()
let mongoose = require('mongoose')


    mongoose.connect(process.env.MONGODB).then(() => {
        console.log('database connect successfully ')
    }).catch((error) => {
        console.log('faild to connect', error)
    })

module.exports = mongoose
