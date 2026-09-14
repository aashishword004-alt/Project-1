let expres = require('express')
let app = expres()
let bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
let connect = require('../database/connection')
let same = require('../module/err')
const friend = '/connect'


app.get('/', (req, res) => {
    res.json('its work')
})


app.post(friend + '/send', (req, res) => {
    let { sender, receiver } = req.body;
    if (!sender || !receiver) {
        return res.send(er.er())
    }
    else {
        const sql = 'INSERT INTO friend_requests(sender_id,receiver_id) VALUES(?,?)'
        const value = [sender, receiver]
        connect.con.query(sql, value, (error, result) => {
            if (error) {
                if (error.errno === 1062) {
                    return res.json([{ 'error': true }, { 'success': false }, { 'message': 'request are send already' }])
                }
                return res.json(same.server())

            }
            else {
                return res.json([{ 'error': false }, { 'success': true }, { 'message': 'request sent succesfully' }, { 'id': result.insertId }])
            }
        })
    }
})


app.put(friend + '/accept', (req, res) => {
    let { receiver, sender } = req.body
    if (!receiver, !sender) {
        res.json(er.er())
    }
    else {
        let sql = `UPDATE friend_requests set status = 'accepted' where receiver_id = (?) and sender_id  = (?)`
        let value = [receiver, sender]
        connect.con.query(sql, value, (error, result) => {
            if (error) {
                return res.json(same.server())
            }
            else {
                res.json([{ 'error': false }, { 'success': true }, { 'message': 'request rejected' }])
            }
        })
    }
})

app.put(friend + '/reject', (req, res) => {
    let { receiver, sender } = req.body
    if (!receiver, !sender) {
        res.json(same.er())
    }
    else {
        let sql = `UPDATE friend_requests set status = 'rejected' where receiver_id = (?) and sender_id  = (?)`
        let value = [receiver, sender]
        connect.con.query(sql, value, (error, result) => {
            if (error) {
                return res.json(same.server())
            }
            else {
                res.json([{ 'error': false }, { 'success': true }, { 'message': 'request rejected' }])
            }
        })

    }
})

app.delete(friend + '/cancel' , (req,res) =>{
    let {id,sender}  = req.body
    {
        if(!id || !sender)
        {
            res.json(same.er())
        }
        else{
            let sql = `delete from  friend_requests where id = ? and sender_id = ? and status = 'pending'`
            connect.con.query(sql,[id,sender] ,  (error, result) =>{
                if(error)
                {
                    console.log(error)
                    res.json(same.server())
                }
                else{
                    res.json([{'error' : false} ,{'success' : true},{'message' : 'request cancel successfully'}])
                }
            })
        }
    }
})



let port = 3000
app.listen(port, () => {
    console.log("Server is runing on " + port)
})