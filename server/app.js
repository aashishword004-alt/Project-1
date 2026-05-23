let express = require('express');
let app = express();

// middlware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const path = require('path');
let upload = require('./apis/multer');

// frentend and backend connection imp 
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false
}));

// for static file

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



// Apis Module
let user = require('./apis/users1')
let post = require('./apis/post1')

// Route
const USER_ROUTE = '/users';
const POST_ROUTE = '/posts';

// User APIS


// Ragister API
app.post(USER_ROUTE + '/register', (req, res) => { user.Ragistretion(req, res) });

// Login API
app.post(USER_ROUTE + '/login', (req, res) => { user.Login(req, res) });

// chnage Password
app.put(USER_ROUTE + '/changepassword', (req, res) => { user.changepassword(req, res) });

// Forgot Password 
app.put(USER_ROUTE + '/forgotpassword', (req, res) => { user.Forgotpassword(req, res) });


// Admin Apis 

const ADMIN = '/admin'
app.post(ADMIN + '/login', (req, res) => {})



// Post Apis
app.post(POST_ROUTE + '/upload/:id', upload.single('media'), (req, res) => { post.uploadpost(req, res) });



const Port = 3000;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});


