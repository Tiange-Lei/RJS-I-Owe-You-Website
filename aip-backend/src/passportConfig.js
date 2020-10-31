const User = require('./userSchema');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//------------------------------Authentication by passport-----------------------------------------
module.exports =function(passport){
    passport.use(
        new localStrategy((username,password,done)=>{
            User.findOne({username:username},(err,user)=>{
                if (err) done(err);
                if(!user) return done(null,false);
                bcrypt.compare(password,user.password,(err,result)=>{
                        if(err) throw err;
                        if (result===true){
                            return done(null,user)
                        }else{
                            return done(null,false)
                        }
                    })
            })
        })
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findById(id).then(
            (user)=>{
                done(null,user);
            }).catch(err=>done(err))
    })

}