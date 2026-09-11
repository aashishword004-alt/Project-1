let expres = require('express')
let app = expres()
let bodyparser = require('body-parser')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
let connect = require('../database/connection')
let er = require('../module/err')
const friend = '/connect'

app.get('/', (req, res) => {
    res.json('its work')
})

app.post(friend + '/send', async (req, res) => {
    let { sender, reciever } = req.body;
    if (!sender || !reciever) {
        return res.send(er.er())
    }
    try {
        const sql = 'INSERT INTO friend_requests(sender_id,receiver_id) VALUES(?,?)'
        const value = [sender, reciever]
        const [result] = await connect.con.query(sql, value,);

        return res.status(200).json([{ 'error': false }, {
            'success': true
        },
        {
            'message': 'request sent successfullt'
        }, { 'id': result.insertId }])

    }
    catch (error) {

        console.log(error);

        if (error.errno === 1062) {
            return res.status(409).json([
                { error: true },
                { success: false },
                { message: 'Friend request is already sent' }
            ]);
        }

        return res.status(500).json([
            { error: true },
            { message: 'Something went wrong in server' }
        ]);
    }
})

let port = 3000
app.listen(port, () => {
    console.log("Server is runing on " + port)
})