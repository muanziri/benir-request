const buyerClient=require('../models/buyerClient')
const bcrypt=require('bcrypt');
const passport=require('passport')
const passportLocal=require('passport-local').Strategy;


const innitiate= ( passport )=>{
    const authenticateUser= (email,password,done)=>{
       buyerClient.findOne({Email:email}).then((results)=>{
         const user=results;  
        if(user== null){
            return done(null,false,{massege:"no user with that email"})
        }
        try {
  
          if(await bcrypt.compare(password), user.password)
        } catch (error) {
            
        }
      })
     
    }
    passport.use(new passportLocal(
     {
         usernameField:'email'
     }
    ),
    authenticateUser
    );
 passport.serializeUser((user,done)=>{

 }) 
 passport.deserializeUser((id,done)=>{
     
})    
}

module.exports=innitiate;