const passport3=require('passport');
const usersClients=require('../models/usersClients')
require('dotenv').config();

var FacebookStrategy = require( 'passport-facebook' ).Strategy;
passport3.serializeUser((usersClients,done)=>{
   done(null,usersClients.id);
})
passport3.deserializeUser((id,done)=>{
  usersClients.findById(id).then((user)=>{
    done(null,user);
  })
  
})
var FACEBOOK_APP_ID=process.env.FACEBOOKSEC1;
var FACEBOOK_APP_SECRET=process.env.FACEBOOKSEC2;
passport3.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields   :['id','displayName','name','gender','picture.type(large)','email']
  },
  function(request, refreshToken, profile, done) {
    
  
   usersClients.findOne({facebookid:profile.id}).then((currentUser)=>{
     if(currentUser){
        
        done(null,currentUser);
     }else{
       new usersClients({
         userName:profile.displayName,
         facebookid:profile.id,
         Profilephoto:profile.photos[0].value
       }).save().then((usersClients)=>{
         done(null,usersClients)
       })
     }
   })

  
  }
));

