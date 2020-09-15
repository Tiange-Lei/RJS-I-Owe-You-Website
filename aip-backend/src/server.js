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

// -----------------------------Built-in memory-----------------------------------------------------------------
const today = Date.now();

let favours = [
    {
      id: uuidv1(),
      publisher:'',
      award:'',
      text: 'Help with the window',
      createdAt: today,
      isAccepted: false,
      picture: ''
    }
  ]
  

//-------------------------------Authentication APIs----------------------------------------------------------
app.use(routes);

// -----------------------------favour APIs-----------------------------------------------------------------

  app.get('/favours', (req, res) => {
    res.status(200).json(favours);
  })


  app.post('/favours', (req, res) => {
    const { favour } = req.body;
    const newFavour = {
      id: uuidv1(),
      text: favour.text,
      award: favour.award,
      createdAt: new Date(),
      isAccepted: false,
      publisher:favour.publisher,
      picture:favour.picture,
    }
    favours.push(newFavour)
    res.status(200).json(newFavour);
  })

  app.post('/favours/:id/accepted', (req, res) => {
    const id = req.params.id;
    console.log(`POST /favours/${id}/accepted`);
    const favourIndex = favours.findIndex(favour => favour.id === id)
    favours[favourIndex].isAccepted = true,
    res.status(200).json(favours[favourIndex]);
  })

  app.delete('/favours/:id', (req, res) => {
    const id = req.params.id;
    console.log(`DELETE /favours/${id}`);
    const favourIndex = favours.findIndex(favour => favour.id === id)
    const deletedFavour = favours.splice(favourIndex, 1);
    res.status(200).json(deletedFavour[0]);
  })


// -----------------------------------Listener-----------------------------------------------------

app.listen(4000,()=>console.log("Listening on port:4000"));