
const connect = require('../database/connection')



// for fatching all posts
// app.get('/posts', (req, res) => {

//     let sql = "SELECT user_id, content, media, media_type FROM posts ORDER BY post_id DESC";
//     connect.con.query(sql, (error, result) => {
//         if (error) {
//             res.json([{ 'error': true },
//             {
//                 'success': false
//             },
//             {
//                 'message': 'Somthing wrong in system'
//             }
//             ]);
//         }
//         else{
//             res.json([{'error' : false},
//                 {
//                     'success' : true
//                 },
//                 {
//                     'data' : result
//                 }
//             ])
//         }
//     })

// });


//  file upload 
let uploadpost = (req, res) => {

    let {user_id, content} = req.body;
    // let user_id = req.params.id;
    
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
}

module.exports.uploadpost = uploadpost;

