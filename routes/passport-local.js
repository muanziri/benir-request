const bcrypt=require('bcrypt');
const passportLocal=require('passport-local').Strategy;


const innitiate= ( passport ,getUserByEmail)=>{
  const {passport}=require('passport')  
    const authenticateUser= async (email,password,done)=>{
      
         const user=getUserByEmail(email);  
        if(user== null){
            return done(null,false,{massege:"no user with that email"})
        }
        try {
  
          if(await bcrypt.compare(password), user.password){
            done(null,user)
          }else{
            return done(null,false,{message:"password incorrect"})
          }
        } catch (error) {
            return done(error)
        }
 
     
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