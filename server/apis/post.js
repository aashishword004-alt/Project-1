let express = require('express');
let app = express();

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');

let upload = require('../apis/multer');

app.use(cors({
    origin: "http://localhost:5000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  
}));

app.post('/upload', upload.single('file'), (req, res) => {
//    res.send("File Uploaded Successfully");
console.log(req.body , req.file);
});



let port = 5000;
app.listen(port , () =>{
     console.log(`Server is running on port ${port}`);
})