
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3030;
const dotenv = require('dotenv')
const data = require('./data/data')
const cors = require('cors')
const path = require('path')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const UserModel = require('./models/userModel')

const userRouter = require('./routes/userRoutes')
const chatRouter = require('./routes/chatRoutes')
const messageRouter = require('./routes/messageRoute')
const { Socket } = require('socket.io');


dotenv.config();
const db_url = process.env.Mongodb_url;


dotenv.config()


app.use(cors(
    {
        origin: 'http://localhost:5173', // Replace with your frontend URL
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    }
))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/ichat');
    console.log('Connected to the database');
       mongoose.connect(db_url )
};
main();

// app.get('/', (req, res) => res.send('Hello World!'))


app.use('/api/data', userRouter)
app.use('/api/chats', chatRouter)
app.use('/api/message', messageRouter)

//------------deployment--------------- 
    const __dirname = path.resolve() ;
if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend','dist')))

    app.get('*' , (req,res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'dist', "index.html"))
    });
}else{
    app.get('/' , async(req,res)=> {
    res.send("api is running succesfully")
    })
}

//------------deployement---------------


app.get('/api/data', (req, res) => {
    res.send(data)
})
app.get('/api/data/:id', (req, res) => {
    let singlechat = data.find((e) => e._id === req.params.id);
    //console.log(singlechat);
    res.send(singlechat);
})



const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));


const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
})

io.on("connection", (Socket) => {
    console.log("connection to socket.io")
    Socket.on("setup", (userData) => {
        Socket.join(userData._id);
        //  console.log(userData._id)
        Socket.emit("connected")
    })

    Socket.on("join chat", (room) => {
        Socket.join(room);
        console.log("user join room:", room);
    })

    Socket.on("typing" , (room) => Socket.to(room).emit("typing"));
    Socket.on("stop typing", (room) => Socket.to(room).emit("stop typing"));


    Socket.on("new message", (newMessageRecievd) => {
        var chat = newMessageRecievd.chat;
        if (!chat.user) return console.log("chat.users not defined");

        chat.user.forEach((user) => {
            if (user._id === newMessageRecievd.sender._id) return;
            Socket.in(user._id).emit("message recieved", newMessageRecievd);
        });
    });

})


