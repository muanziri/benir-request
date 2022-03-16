const Express=require('express');
const passport=require('passport')
const router=Express.Router();
const userClient=require('../models/usersClients');
const Views=require('../models/commodities/views')
const watchtime=require('../models/commodities/watchtime');
const subscribe=require('../models/commodities/subscribe')


require('./ath-cleints');
require('./ath-cleints-facebook');



router.get('/login',(req,res)=>{
    res.render('login');

})
router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook',
   { successRedirect: '/auth/google/success',
     failureRedirect: '/auth/google/failure' }));
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));
router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

const check=(req,res,next)=>{
    if (!req.user) {
        
        res.redirect('/login')
        console.log(req.user)
        
    } else {
        next(); 
    }
}



router.get('/auth/google/success',(req,res)=>{
    res.redirect('/seller');

})
router.get('/auth/google/failure',(req,res)=>{
    res.redirect('/login');

})


router.get('/',(req,res)=>{

    res.render('landingPage');

})



router.get('/seller',check,(req,res)=>{
    let user1= req.user.googleid;
    userClient.findOne({googleid:user1}).then((results)=>{
        Views.find().then((results2)=>{
            watchtime.find().then((results3)=>{
                subscribe.find().then((results4)=>{
                    res.render('seller',{userClient:results,views:results2,watchtime:results3,subscribe:results4});
                })
               
            })
            
        })
        
    })

})

router.post('/update/:id', async (req,res)=>{
    let ID=req.params.id;
    let viewsCount=req.body.videoId.trim();

    

    const USERCLIENT= await userClient.findOne({_id:ID})
      Views.findOne({_id:viewsCount}).then((results)=>{   
        
       let myquery={id:ID};
       let watchtimeQuery=results.id;
       let newPOINTS= USERCLIENT.points+1;
       let WATCHTIMEPoints=results.views+1;
        
    
      let query={points:newPOINTS}
      Views.updateOne({_id:watchtimeQuery},{views:WATCHTIMEPoints},(err,ress)=>{
        if (err)throw err
        
    })
         
       userClient.updateOne(myquery,query,(err,ress)=>{
           if (err)throw err
           
          res.redirect('/seller')
       
    })
       })
     
    

})

router.post('/updateWatchtime/:id', async (req,res)=>{
    let ID=req.params.id;
    let viewsCount=req.body.videoId.trim();

    

    const USERCLIENT= await userClient.findOne({_id:ID})
      watchtime.findOne({_id:viewsCount}).then((results)=>{   
        
       let myquery={id:ID};
       let watchtimeQuery=results.id;
       let newPOINTS= USERCLIENT.points+1;
       let WATCHTIMEPoints=results.views+4;
    
    
      let query={points:newPOINTS}
      watchtime.updateOne({_id:watchtimeQuery},{views:WATCHTIMEPoints},(err,ress)=>{
        if (err)throw err
        
    })
         
       userClient.updateOne(myquery,query,(err,ress)=>{
           if (err)throw err
           
          res.redirect('/seller')
       
    })
       })
     
    

})





module.exports=router;