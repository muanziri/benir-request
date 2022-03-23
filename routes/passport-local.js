const bcrypt=require('bcrypt');
const buyerClient=require('../models/buyerClient');
const passport=require('passport')
const passportLocal=require('passport-local').Strategy;



passport.use(new passportLocal({
  usernameField:'email',
  passwordField:'password'

},
  function(email, password, done) {
    buyerClient.findOne({ Email: email },async function (err, user) {
      if (!user) { return done(null, false,{message:'no user found pliz signup'}); }else{
      const thepassword=await bcrypt.compare(password,user.password)
      console.log(email)
      if (err) { return done(err); }
      if (!thepassword) { return done(null, false,{message:'wrong password'}); }
      return done(null, user);}
    });
  }
));
  passport.serializeUser((user ,done)=>{
 
    done(null,user.id);
    
 
 })
 passport.deserializeUser((id,done)=>{
   
  buyerClient.findById(id).then((user)=>{
     
     done(null,user);
   })
   
 })
 

