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

// ----------------------------connect to MongoDB-------------------------------------------------------------
const dbString = 'mongodb+srv://encore:nmjCf9Mf3SEAW9tc@cluster0.mp99a.mongodb.net/<dbname>?retryWrites=true&w=majority';
const dbOptions = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(dbString,dbOptions,()=>{console.log("Mongoose is connected!");})
const connection = mongoose.createConnection(dbString,dbOptions);

const sessionStore = new MongoStore({
  mongooseConnection:connection,
  collection:'sessions',
})
mongoose.set('useFindAndModify', false);

// ----------------------------setup express-------------------------------------------------------------------
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

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
  console.log(req.session);
  console.log(req.user);
  next();
})


//-------------------------------Importing routes----------------------------------------------------------
app.use(routes);


// -----------------------------------Listener-----------------------------------------------------

app.listen(4000,()=>console.log("Listening on port:4000"));