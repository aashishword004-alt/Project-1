let express = require('express')
let app = express()


// sneder / reciever / seen / react delete 
app.get( '/chat' ,(req,res) =>{
   let {sender , reciver , message , timestep  , date , response , replay  , add  , file_cone  }  = req.body

})

let port = 3000
app.listen(port , () =>{
    console.log('Server runnig on ' , port)
})