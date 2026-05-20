const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname, 'uploads/'));
    },

    filename: (req, file, cb) => {
        cb(null,  Date.now() + "-" + Math.random()  + "-" + file.originalname);
    }
});

const filterfile = (req,file,cb,) =>{
    if(file.mimetype.startsWith("image/"))
        // || file.mimetype.startsWith("video/")
     {
         cb(null,true);
         
     }
     else
     {
         cb(null,false + "Somthing went wrong, only image and video files are allowed");
     }
}

const postupload = multer({
    storage : storage,
    fileFilter : filterfile,
    limits : {fileSize : 10 * 1024 * 1024}  // 30mb limit 
});
  

// const upload = { postupload };

module.exports = postupload;