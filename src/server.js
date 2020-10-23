const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieparser = require('cookie-parser');
const session = require('express-session');
var routes = require('./routes');
const { db } = require('./userSchema');
const MongoStore = require('connect-mongo')(session);
const uuidv1 = require ('uuid').v1;
const path = require('path');

// ----------------------------connect to MongoDB-------------------------------------------------------------
const dbString = 'mongodb://fish:td4w6279Jxt8X31a@cluster0-shard-00-00.fakbj.mongodb.net:27017,cluster0-shard-00-01.fakbj.mongodb.net:27017,cluster0-shard-00-02.fakbj.mongodb.net:27017/assignment2aip?ssl=true&replicaSet=atlas-o7fgeu-shard-0&authSource=admin&retryWrites=true&w=majority';
const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};
<<<<<<< HEAD
let url = process.env.MONGODB_URI || 'mongodb://localhost/trip';
mongoose.connect(url,dbOptions,()=>{console.log("Mongoose is connected!");})
const connection = mongoose.createConnection(dbString,dbOptions);
=======
let url = process.env.MONGODB_URI || dbString;
mongoose.connect(url,dbOptions,()=>{console.log("Mongoose is connected!");})
const connection = mongoose.createConnection(url,dbOptions);
>>>>>>> main

const sessionStore = new MongoStore({
  mongooseConnection:connection,
  collection:'sessions',
})
mongoose.set('useFindAndModify', false);

// ----------------------------setup express-------------------------------------------------------------------
const app=express();
app.use(express.json({limit:'2mb'}));
app.use(express.urlencoded({extended:true,limit:'2mb'}));
// app.use(express.json({limit:'2mb'}));
// app.use(express.urlencoded({limit:'2mb'}));
app.use(cors({
    origin: "https://localhost:3000/",
    credentials: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------------Configure Session and cookie-------------------------------------------------------------
app.use(session({
  secret:"secret",
  resave: false,
  saveUninitialized:true,
  store:sessionStore,
  cookie: {
      maxAge:1000*60*60*1
  }
}))
app.use(cookieparser('secret'));

// ------------------------------Import Local strategy and initialize passport-------------------------------------
require('./passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());
// ------------------------------Test------------------------------------------------------------------------------
app.use((req,res,next)=>{
  next();
})


//-------------------------------Importing routes----------------------------------------------------------
app.use(routes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('aip/build'));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'aip','build','index.html'));
  });
}

const port = process.env.PORT || 4000;
// -----------------------------------Listener-----------------------------------------------------

app.listen(port,()=>console.log("Listening on port:4000"));