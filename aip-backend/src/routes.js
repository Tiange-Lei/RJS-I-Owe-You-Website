const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const User = require('./userSchema');
const Favour = require('./favourSchema');
const bcrypt = require('bcryptjs');
const userInfo = require('./userInfo');
const awards = require('./favourAwards');
// ------------------------------Authentication APIs-------------------------------------------------
router.post('/api/login',(req,res,next)=>{
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

router.post("/api/register",(req,res)=>{
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

router.get("/api/logout",(req,res)=>{
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

router.get('/api/favours', (req, res) => {
  Favour.find({},(err,Favour)=>{
    if(err) throw err;
    res.status(200).json(Favour);
  })
})

// create favour-----------------------------
router.post('/api/favours', async (req, res) => {
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
router.delete('/api/favours/:_id', async (req, res) => {
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
router.post('/api/favours/:_id/:receiver/accepted', async (req, res) => {
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
router.post('/api/addcomment/:favourID',async (req,res)=>{
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
//Award operations
//Create Award
router.post('/api/createAwards', async (req,res)=>{
  const { award } = req.body;
  const newAward = new awards({
    debtor: award.debtor,
    creditor: award.creditor,
    award: award.award
  });
  await newAward.save();
  const count = 1;
  userInfo.findOneAndUpdate({_id:req.body.creditor},{$inc:{numberOfAward: count}}, async(err,userInfo)=>{
    if(err) throw err;
    res.status(200).json(userInfo);
  })
  res.status(200).json(newAward);
})
//Delete Award
router.delete('/api/deleteAwards/:id', async (req,res)=>{
  await awards.deleteOne({_id:req.params.id},(err)=>{
    if(err){
      console.log("Fail to detele this award");
    }else{
      res.status(200).send("Award delete successfully")
    }
  })
})
//Load awards
router.get('/api/loadAwards', async (req,res)=>{
  awards.find({}, async (err,awards)=>{
    if(err) throw err;
    res.status(200).json(awards);
  })
})

//party detection
router.get('/api/getParty', async (req,res,next) => {
    awards.aggregate({

    })
  }
)

//export routers------------------------------
  module.exports = router;