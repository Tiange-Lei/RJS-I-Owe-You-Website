const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const User = require('./userSchema');
const Favour = require('./favourSchema');
const bcrypt = require('bcryptjs');
const userInfo = require('./userInfo');
const AwardRelation = require('./awardRelationSchema');
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
          const newUserInfo = new userInfo({
            username:req.body.username,
            numberOfAward:0
          })
          await newUserInfo.save();
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
router.get('/api/users',(req,res)=>{
  userInfo.find({},(err,User)=>{
    if(err) throw err;
    res.status(200).json(User);
  })
})
//Search User
router.get('/api/users/:name',(req,res)=>{
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
    isFinished: false,
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
  await Favour.findByIdAndUpdate({_id:id},{isAccepted:true,receiver:receiver},{new:true},(err,updatedFavour)=>{
    if(err) throw err;
    res.status(200).json(updatedFavour);
  })
})

// --------------------------------------Comments Operations-----------------------------------
// -------add comment-------------------------
router.post('/api/comment/:favourID',async (req,res)=>{
  let favourid = req.params.favourID;
  const {comment}=req.body;
  const newComment = {
    favourID: comment.favourID,
    username: comment.username,
    commentText: comment.commentText
  }
  await Favour.findById({_id:favourid},async (err,favour)=>{
    if(err)throw err;
    if(!favour){
      res.status(200).json('');
    }
    else{
      favour.comments = favour.comments.concat(newComment);
      await Favour.findByIdAndUpdate({_id:favourid},{comments:favour.comments},(err)=>{
        if (err) throw err;
        res.status(200).json(newComment)
      })
    }
  })
})

// add award to favour----------------------------
router.post('/api/favours/:favourID/awardIncrement',async(req,res)=>{
  let id = req.params.favourID;
  const info=req.body;
  const newFollower={
    favourID:info.favourID,
    name:info.followerName,
    award:info.award,
  }
  await Favour.findById({_id:id},async (err,favour)=>{
    if(err)throw err;
    if(!favour){
      res.status(200).json('');
    }
    else{
      favour.follower = favour.follower.concat(newFollower);
      await Favour.findByIdAndUpdate({_id:id},{follower:favour.follower},(err)=>{
        if (err) throw err;
        res.status(200).json(newFollower)
      })
    }
  })


})
//Award operations

//Load awards--------------------------------------------------
router.get('/api/awards', (req, res) => {
  AwardRelation.find({},(err,awards)=>{
    if(err) throw err;
    res.status(200).json(awards);
  })
})

//Delete Award
router.delete('/api/awards/:_id', async (req,res)=>{
  let id = req.params._id;
  await AwardRelation.deleteOne({_id:id},(err)=>{
    if(err){
      throw err;
    }
    AwardRelation.find({},(err,Awards)=>{
      if(err) throw err;
      res.status(200).json(Awards)
    })
  })
})
//Create Award
router.post('/api/newAwardRelation/', async (req,res)=>{
  const relation = req.body;
  const newAwardRelation = new AwardRelation({
    favourID:relation.favourID,
    debtor:relation.debtor,
    creditor:relation.creditor,
    award:relation.award,
  })
  await newAwardRelation.save();
  await userInfo.findOne({username:relation.creditor},async(err,Info)=>{
    if(err) throw err;
    Info.numberOfAward+=1;
    await userInfo.findOneAndUpdate({username:relation.creditor},{numberOfAward:Info.numberOfAward},(err,doc)=>{
      if(err)throw err;
    });
    if(relation.follower){
      let followers=relation.follower;
      followers.map(async (follower,key)=>{
        const newRelation=new AwardRelation({
          favourID:follower.favourID,
          debtor:follower.name,
          creditor:relation.creditor,
          award:follower.award
        })
        await newRelation.save();
        await userInfo.findOne({username:relation.creditor},async(err,Info)=>{
          if(err)throw err;
          Info.numberOfAward+=1;
          await userInfo.findOneAndUpdate({username:relation.creditor},{numberOfAward:Info.numberOfAward},(err,doc)=>{
            if(err)throw err;
          })
        })
      });
    }
    if(relation.favourID){
      await Favour.findByIdAndUpdate({_id:relation.favourID},{isFinished:true},{new:true},(err,updatedFavour)=>{
        if(err) throw err;
        res.status(200).json(updatedFavour);
      })
    }
    else{
      res.status(200).json(newAwardRelation)
    }
  })
})
//load leaderboard
router.get('/api/leadBoard',async(req,res)=>{
  userInfo.find({},{name:1,numberOfAward:1,_id:0})
          .sort({numberOfAward:-1})
          .exec(async (err,userInfo)=>{
            if(err) throw err;
            res.status(200).json(userInfo);
          })
})
//party detection
router.get('/api/party/:user', async (req,res,next) => {
    awards.aggregate([
      { $match: {"debitor":req.params.user}},
      { $graphLookup:
        {
          from:"Awards",
          startWith:"$creditor", 
          connctFromField:"creditor",
          conncetToField:"debitor",
          maxDepth: 7, //depth start with 0;
          depthField:"partyMembers",
          as:"partyLoop"
        }
      },
      { $project:
        {
          debitor:1,
          creditor:0,
          "whoInTheParty":"partyLoop.debitor"
        }
      },
      async (err,party)=>{
        if(err) throw err;
        res.status(200).json(party);
        next();
      }
    ])
})

//export routers------------------------------
  module.exports = router;