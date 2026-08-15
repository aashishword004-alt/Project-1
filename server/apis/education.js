let express = require('express');
let app = express();

// middleware;

let bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extends: true }));

// database 
let connect = require('../database/connection')

// routes
let EDUC = '/education';

app.get(EDUC, (req, res) => {
    res.json('Welcome to Education API');
});

// for upload Education details
app.post(EDUC + '/upload', (req, res) => {


    //person_id , name_uni, degree_name ,course_name , passing_year , grade , percentage
    let { person_id, name_uni, degree_name, course_name, passing_year, grade, percentage } = req.body;

    if (!person_id || !name_uni || !degree_name || !course_name || !passing_year || !grade || !percentage) {
        return res.status(400).json([
            { 'error': true },
            { 'success': false },
            { 'message': 'input is missing' }
        ]);
    }
    else {
        let sql = 'insert into education (person_id , name_uni, degree_name ,course_name , passing_year , grade , percentage) values (?,?,?,?,?,?,?)';
        let values = [person_id, name_uni, degree_name, course_name, passing_year, grade, percentage];
        connect.con.query(sql, values, (err, result) => {
            if (err) {
                res.json([{ 'error': true },
                {
                    'success': false
                },
                {
                    'message': 'somthing wrong in server'
                }]);
            }
            else {
                res.json([{ 'error': false },
                {
                    'success': true
                },
                {
                    'message': 'Education Details Uploaded Successfully'
                }
                ]);
            }
        })
    }

});

// for education details update
app.put(EDUC + '/update', (req, res) => {
    let { education_id,  name_uni, degree_name, course_name, passing_year, grade, percentage } = req.body;

    if (!education_id || !name_uni || !degree_name || !course_name || !passing_year || !grade || !percentage) {
        {
            res.json([{ 'error': true },
            {
                'success': false
            },
            {
                'message': 'input is missing'
            }
            ]);

        }

    }
    else {
        let sql = 'update education set name_uni = ? , degree_name  = ? , course_name = ? ,passing_year = ? , grade = ? , percentage = ? where education_id = ? ';
        let values = [ name_uni, degree_name, course_name, passing_year, grade, percentage, education_id ];
        connect.con.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                res.json([{ 'error': true },
                {
                    'success': false
                },
                {
                    'message': 'somthing wrong inserver'
                }
                ])
            }
            else {
                if (result.affectedRows ===  0 ) {
                    res.json([{ 'error': true },
                    {
                        'success': false
                    },
                    {
                        'message': 'education details not found'
                    }

                    ])
                }
                else {
                    res.json([{ 'error': false },
                    {
                        'success': true
                    },
                    {
                        'message': 'education details updated successfully'
                    },{
                        'result':[ result.affectedRows]
                    }
                    ])
                }
            }
        })
    }
}) 

app.delete(EDUC + '/delete', (req,res) =>{
    res.json('delete education details');
})

let port = 3000;
app.listen(port, () => {
    console.log('Server is Running On port ' + port);
})  