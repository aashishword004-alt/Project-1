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

    let sql = "SELECT * FROM posts ORDER BY post_id DESC";
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

    let { content,user_id } = req.body;
    let media = req.file.filename;
    let mediatype = req.file.mimetype;
    if (!content || !media || !mediatype) {
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
        let sql = "INSERT INTO posts (content, media, mediatype) VALUES (?, ?, ?)";
        let values = [content, media , mediatype];
        connect.con.query(sql, values, (error, result) => {
            if (error) {
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