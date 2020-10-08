const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const User = require('./userSchema');
const Favour = require('./favourSchema');
const bcrypt = require('bcryptjs');
const userInfo = require('./userInfo');

var dataTransfer = [];

// ------------------------------Authentication APIs-------------------------------------------------
router.post('/login',(req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
      if(err) throw err;
      if(!user) res.send({error: 'No user exists'});
      else{
          req.logIn(user,err=>{
            if(err) throw err;
            res.send(user);
          })
      }
    })(req,res,next)
  });

router.post("/register",(req,res)=>{
    User.findOne({username:req.body.username},async (err,doc)=>{
      if (err) throw err;
      if (doc) res.send("Username already exists");
      if (!doc){
          const hashedPassword = await bcrypt.hash(req.body.password,15);
          const newUser =new User({
              username:req.body.username,
              password:hashedPassword
          });
          await newUser.save();
          res.send("Registered");
      }
  })
  });

router.get("/logout",(req,res)=>{
  req.logOut();
  res.send('logout')
})
//User Operation--------------------------------------------------------------
//Load all users
router.get('/api/loadUsers',(req,res)=>{
  userInfo.find({},(err,User)=>{
    if(err) throw err;
    res.status(200).json(User);
  })
})
//Search User
router.get('/api/searchUsers/:name',(req,res)=>{
  console.log(req);
  userInfo.find({username:req.params.name},(err,User)=>{
    if(err) throw err;
    res.status(200).json(User);
  })
})

// ------------------------------------Favours Operation--------------------------------------------

// loading favours---------------------------

router.get('/favours', (req, res) => {
  Favour.find({},(err,Favour)=>{
    if(err) throw err;
    res.status(200).json(Favour);
  })
})

// create favour-----------------------------
router.post('/favours', async (req, res) => {
  const { favour } = req.body;
  const newFavour = new Favour({
    publisher:favour.publisher,
    text: favour.text,
    award: favour.award,
    createdAt: new Date(),
    isAccepted: false,
    receiver:'',
    picture:favour.picture,
  });
  await newFavour.save();
  res.status(200).json(newFavour);
})

//delete favour------------------------------
router.delete('/favours/:_id', async (req, res) => {
  let id = req.params._id;
  console.log(`DELETE /favours/${id}`);
  await Favour.deleteOne({_id:id},(err)=>{
    if(err) throw err;
    Favour.find({},(err,Favour)=>{
      if(err) throw err;
      res.status(200).json(Favour);
    })
  })
})

//accept favour--------------------------------
router.post('/favours/:_id/:receiver/accepted', async (req, res) => {
  let id = req.params._id;
  const receiver = req.params.receiver;
  console.log(receiver);
  await Favour.findByIdAndUpdate({_id:id},{isAccepted:true,receiver:receiver},{new:true},(err,updatedFavour)=>{
    if(err) throw err;
    res.status(200).json(updatedFavour);
    console.log(updatedFavour);
  })
})

// --------------------------------------Comments Operations-----------------------------------
// -------add comment-------------------------
router.post('/addcomment/:favourID',async (req,res)=>{
  let favourid = req.params.favourID;
  const {comment}=req.body;
  const newComment = {
    favourID: comment.favourID,
    username: comment.username,
    commentText: comment.commentText
  }
  await Favour.findById({_id:favourid},async (err,favour)=>{
    if(err)throw err;
    favour.comments = favour.comments.concat(newComment);
    await Favour.findByIdAndUpdate({_id:favourid},{comments:favour.comments},(err)=>{
      if (err) throw err;
      res.status(200).json(newComment)
    })
  })
})

//party detection
router.get('/getParty', async (req,res,next) => {
    Favour.find({},{'publisher':1,'receiver':1,_id:0},(err,Favour)=>{
    if(err) throw err;
    res.status(200).json(Favour);
    dataTransfer = Favour;
    next();
  })}
)

//export routers------------------------------
  module.exports = router;