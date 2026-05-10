const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const filterfile = (req,file,cb) =>{
     if(file.mimetype === "image/jpeg")
     {
         cb(null,true);
     }
     else
     {
         cb(null,false + "only jpeg file is allowed");
     }
}

const upload = multer({ storage });

module.exports = upload;