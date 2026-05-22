let express = require('express');
let app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const connect = require('../database/connection')
let upload = require('../apis/multer');



app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// for fatching all posts
app.get('/posts', (req, res) => {

    let sql = "SELECT user_id, content, media, media_type FROM posts ORDER BY post_id DESC";
    connect.con.query(sql, (error, result) => {
        if (error) {
            res.json([{ 'error': true },
            {
                'success': false
            },
            {
                'message': 'Somthing wrong in system'
            }
            ]);
        }
        else{
            res.json([{'error' : false},
                {
                    'success' : true
                },
                {
                    'data' : result
                }
            ])
        }
    })

});


//  file upload 
app.post('/upload', upload.single('media'), (req, res) => {

    let { user_id ,content} = req.body;
    
    let media = req.file.filename;
    let media_type = req.file.mimetype;

    if ( !user_id || !content || !media) {
        res.json([{ 'error': true },
        {
            'success': false,
        },
        {
            'message': 'input is missing'
        }
        ]);
    }
    else {
        let sql = "INSERT INTO posts (user_id, content, media, media_type) VALUES (?, ?, ?, ?)";
        let values = [user_id, content, media, media_type];
        connect.con.query(sql, values, (error, result) => {
            if (error) {
                console.log(error);
                
                res.json([{ 'error': true }, {
                    'success': false,
                }
                    ,
                {
                    'message': 'Somthing wrong in system'
                }]);
            }
            else {
                res.json([{ 'error': false },
                {
                    'success': true
                },
                {
                    'message': 'Post Uploded Successfully'
                }
                ]);

            }
        });
    }
});



let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})