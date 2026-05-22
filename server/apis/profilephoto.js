let express = require('express');
app = express();
let connect = require('../database/connection');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let upload = require('./multer');
let cors = require('cors');
let path = require('path');


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}));


const photo = '/profilephoto';
app.get(photo, (req, res) => {

    let sql = 'SELECT name , profile_photo FROM users';
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
        else {
            res.json([{ 'error': false },
            {
                'success': true
            },
            {
                'data': result
            }
            ]);
        }
    })
});




const ProfilePhoto = '/profilephoto';

app.post(ProfilePhoto, upload.single('profile_photo'), (req, res) => {
    profile_photo = req.file.filename;
    let { id } = req.body;
    if (!id) {
        res.json([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'Input is Missing'
        }
        ]);
    }
    else {
        let sql = 'update users set profile_photo = ? where id = ?';
        let value = [profile_photo, id];
        connect.con.query(sql, value, (error, result) => {
            if (error) {
                console.log(error);
                res.json([{ 'error': true },
                {
                    'success': false
                },
                {
                    'message': 'Somthing wrong in system'
                }
                ]);
            }
            else {
                if (result.affectedRows === 0) {
                    res.json([{ 'error': true },
                    {
                        'success': false
                    },
                    {
                        'message': 'User not found'
                    }
                    ]);
                }
                else {
                    res.json([{ 'error': false },
                    {
                        'success': true
                    },
                    {
                        'message': 'Profile photo set  successfully'
                    }
                    ]);
                }
            }
        });
    }

});




let port = 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});