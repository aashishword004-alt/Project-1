let express = require('express')
let app = express()

app.get( '/chat' ,(req,res) =>{
    res.json('port are running')

})

let port = 3000
app.listen(port , () =>{
    console.log('Server runnig on ' , port)
})