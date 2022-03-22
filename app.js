const Express=require('express')
const mongoose=require('mongoose');
const passport=require('passport');
const cookieSession=require('cookie-session')
require('dotenv').config();


const DB = process.env.MONGODBSEC;

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
 app.get('/watsapp',(req,res)=>{
  const accountSid = 'AC7040d7240cdbf75fe34c4b1d1e80bdf5'; 
  const authToken = '69dc56bc814431ab9f6f60487c1ded55'; 
  const client = require('twilio')(accountSid, authToken); 
   
  client.messages 
        .create({ 
          body: `<h1>help</h1>`, 
           from: 'whatsapp:+14155238886',       
           to: 'whatsapp:+256787861513', 
         }) 
        .then(message => console.log(message.sid)) 
        .done();
 })

