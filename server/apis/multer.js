const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null,  Date.now() + "-" + Math.random()  + "-" + file.originalname);
    }
});

const filterfile = (req,file,cb) =>{
     if(file.mimetype.startsWith("image/"))
     {
         cb(null,true);
     }
     else
     {
         cb(null,false + "only jpeg file is allowed");
        
     }
}

const postupload = multer({
    storage : storage,
    fileFilter : filterfile,
    limits : {fileSize : 5 * 1024 * 1024}  // 10mb limit 

})
  

// const upload = { postupload };

module.exports = postupload;