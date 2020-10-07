const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const User = require('./userSchema');
const Favour = require('./favourSchema');
const bcrypt = require('bcryptjs');
const friends = require('./friendsStatus');
//const party = require('./party');
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
//User Operation
//Load all users
router.get('/api/loadUsers',(req,res)=>{
  User.find({},(err,User)=>{
    if(err) throw err;
    res.status(200).json(User);
  })
})
//Search User
router.get('/api/searchUsers/:name',(req,res)=>{
  console.log(req);
  User.find({username:req.params.name},(err,User)=>{
    if(err) throw err;
    res.status(200).json(User);
  })
})
//Request for adding friends
router.post('/api/requestFriend/:userA/:userB',async (req,res)=>{
  const docA = await friends.findOneAndUpdate(
      { requester: req.params.userA, recipient: req.params.userB },
      { $set: { status: 1 }},
      { upsert: true, new: true },(err,docA)=>{
        if(err) throw err;
        res.status(200).json(docA);
      });
  const docB = await friends.findOneAndUpdate(
      { recipient: UserA, requester: UserB },
      { $set: { status: 2 }},
      { upsert: true, new: true },(err,docB)=>{
        if(err) throw err;
        res.status(200).json(docB);
      });
  const updateUserA = await userInfo.findOneAndUpdate(
      { _id: req.params.userA },
      { $push: { friends: docA._id }},(err,updateUserA)=>{
        if(err) throw err;
        res.status(200).json(updateUserA);
      });
  const updateUserB = await userInfo.findOneAndUpdate(
      { _id: req.params.userB },
      { $push: { friends: docB._id }},(err,updateUserB)=>{
        if(err) throw err;
        res.status(200).json(updateUserB);
      });
})
//Accept friends
router.post('/api/acceptFriend/:userA/:userB', (req,res)=>{
  const docA = friends.findOneAndUpdate(
      { requester: req.params.userA, recipient: req.params.userB },
      { $set: { status: 3 }},(err,docA)=>{
        if(err) throw err;
        res.status(200).json(docA);
      })
  const docB = friends.findOneAndUpdate(
      { recipient: req.params.userA, requester: req.params.userB },
      { $set: { status: 3 }},(err,docB)=>{
        if(err) throw err;
        res.status(200).json(docB);
      })
})
//Reject friends
router.post('/api/rejectFriend/:userA/:userB',async (req,res)=>{
  const docA = await friends.findOneAndRemove(
      { requester: req.params.userA, recipient: req.params.userB },(err,docA)=>{
        if(err) throw err;
        res.status(200).json(docA);
      });
  const docB = await friends.findOneAndRemove(
      { recipient: req.params.userA, requester: req.params.userB },(err,docB)=>{
        if(err) throw err;
        res.status(200).json(docB);
      });
  const updateUserA = await friends.findOneAndUpdate(
      { _id: req.params.userA },
      { $pull: { friends: docA._id }},(err,updateUserA)=>{
        if(err) throw err;
        res.status(200).json(updateUserA);
      });
  const updateUserB = await friends.findOneAndUpdate(
      { _id: req.params.userB },
      { $pull: { friends: docB._id }},(err,updateUserB)=>{
        if(err) throw err;
        res.status(200).json(updateUserB);
      });
})

//Load Friend list
router.get('/api/loadFriendlist/:currentuid',(req,res)=>{
  userInfo.aggregate([
              { "$lookup": {
                "from": friends.collection.name,
                "let": { "friends": "$friends" },
                "pipeline": [
                  { "$match": {
                    "recipient": req.params.currentuid,
                    "$expr": { "$in": [ "$_id", "$$friends" ] }
                  }},
                  { "$project": { "status": 1 } }
                ],
                "as": "friends"
              }},
              { "$addFields": {
                "friendsStatus": {
                  "$ifNull": [ { "$min": "$friends.status" }, 0 ]
                }
              }}
            ]),(err,userInfo)=>{
              if(err) throw err;
              res.status(200).json(userInfo);
            }
});
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
//api-friends list


//party function
router.get('/getParty', async (req,res,next) => {
    Favour.find({},{'publisher':1,'receiver':1,_id:0},(err,Favour)=>{
    if(err) throw err;
    res.status(200).json(Favour);
    dataTransfer = Favour;
    next();
  })},()=>{
      var list = [];
      dataTransfer.forEach(doc => {
      list.push(doc);
      //party[0] = list[0];
      console.log('a');
      console.log(list);
      });
      const first = JSON.stringify({username:JSON.parse(list[0].publisher)});
      var cache = [];
      cache[0] = first;
      

  }
)

//export routers------------------------------
  module.exports = router;