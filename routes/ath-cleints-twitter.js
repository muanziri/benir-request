const passport2=require('passport');
const usersClients=require('../models/usersClients')

var GoogleStrategy2 = require( 'passport-google-oauth2' ).Strategy;
passport2.serializeUser((usersClients,done)=>{
   done(null,usersClients.id);
})
passport2.deserializeUser((id,done)=>{
  usersClients.findById(id).then((user)=>{
    done(null,user);
  })
  
})
var GOOGLE_CLIENT_ID='856444356425-kmklcbakccse6h0hi7mau78n3uh2nrts.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET='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'
passport2.use(new GoogleStrategy2({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
  
    usersClients.findOne({googleid:profile.id}).then((currentUser)=>{
      if(currentUser){
         console.log('u are loged in as '+currentUser.userName);
         done(null,currentUser);
      }else{
        new usersClients({
          userName:profile.displayName,
          Email:profile.email,
          googleid:profile.id,
          Profilephoto:profile.picture
        }).save().then((usersClients)=>{
          done(null,usersClients)
        })
      }
    })

  
  }
));

