let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');


const connect = require('../database/connection')



let upload = require('../apis/multer');


app.use(cors({
    origin: "http://localhost:5000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


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


// for file upload 
app.post('/upload', upload.single('media'), (req, res) => {

    let { content } = req.body;
    let media = req.file.filename;
    if (!content || !media) {
        res.json([{ 'error': true },
        {
            'success': false,
        },
        {
            'message': 'input is missing'
        }
        ])
    }
    else {
        let sql = "INSERT INTO posts (content, media) VALUES (?, ?)";
        let values = [content, media];
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



let port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})