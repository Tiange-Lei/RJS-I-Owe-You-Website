const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const User = require('./userSchema');
const bcrypt = require('bcryptjs');

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

  module.exports = router;