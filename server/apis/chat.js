let express = require('express')
let app = express()
let connect = require('../database/connection')

let bodyarser = require('body-parser')
app.use(bodyarser.json())
app.use(bodyarser.urlencoded({ extended: true }))


const CHAT = '/message'




app.get(CHAT, (req, res) => {

    let sql = 'select id , conversation_id,sender_id , content from messages'
    connect.con.query(sql, (err, result) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(result)
        }
    })
})


app.post(CHAT + '/conversation', (req, res) => {
    let { sender, receiver } = req.body
    console.log(sender , receiver)
    if (!sender || !receiver) {
        res.json([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'input is missing'
        }
        ])
    }
    else {
        let sql = `select cp1.conversation_id FROM conversation_participants cp1 JOIN
                    conversation_participants cp2 on cp1.conversation_id = cp2.conversation_id
                    JOIN conversations c on c.id = cp1.conversation_id WHERE cp1.user_id = ? and cp2.user_id = ? and c.type = 'direct' `

        let value = [sender, receiver]
        connect.con.query(sql, value, (error, result) => {
            if (error) {
                res.json([{
                    'error': true
                },
                {
                    'success': false
                },
                {
                    'message': 'somthing wrong in server '
                }])
            }
            else{
                if(result.length  === 0)
                {
                    res.json([{'error' : 'no row found'}])
                }
            }
        })
    }
})


app.post(CHAT, (req, res) => {
    let { conversation_id, sender_id, content } = req.body
    console.log(conversation_id,sender_id,content)
    if (!conversation_id || !sender_id || !content) {
        res.json([{ 'error': true },
        {
            'success': false
        },
        {
            'message': 'input is missing'
        }
        ])
    }
    else {
        let sql = 'insert into messages (conversation_id,sender_id,content) values (?,?,?)'
        let values = [conversation_id, sender_id, content]
        connect.con.query(sql, values, (error, result) => {
            if (error) {
                res.json(error)
            }
            else {
                res.json([{
                    'error': false
                },
                {
                    'success': true
                },
                {
                    'message': 'message sent successfully'
                },
                {
                    'result': result.insertID
                }])
            }

        })
    }
})



let port = 3000
app.listen(port, () => {
    console.log('Server runnig on ', port)
})