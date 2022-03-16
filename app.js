const Express=require('express')
const mongoose=require('mongoose');
const passport=require('passport');
const cookieSession=require('cookie-session')


const DB = 'mongodb+srv://munazirio:hello@sockets.uadmg.mongodb.net/benir-request?retryWrites=true&w=majority';

mongoose.connect(DB,{ useNewUrlParser:true,useUnifiedTopology:true})
  .then((results)=>{

    
   console.log('connected....');
  })
  .catch((err)=>{
      console.warn(err)
  })


 
const app=Express();
let port=process.env.PORT||3000
app.use(cookieSession({
  name: 'session',
  keys: ['MUNAMUNAMUNA'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

 app.listen(port,()=>{console.log('connected')});
 app.use(Express.urlencoded({extended: true}));
 app.use(passport.initialize());
app.use(passport.session());
 app.use('/public',Express.static(__dirname+'/public'))
 app.set('view engine','ejs');



 app.use('/',require('./routes/severs-cleints'));
 app.use('/goods',require('./routes/index'));
 