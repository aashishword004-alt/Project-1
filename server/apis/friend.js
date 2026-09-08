let expres = require('express')
let app = expres()
let bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const friend  = '/connect'

app.get('/' ,(req,res) =>{
    res.json('its work')
})

app.post(friend + '/send' , (req,res) =>{
    res.json('work')
})

let port = 3000
app.listen(port,() =>{
    console.log("Server is runing on " + port)
})