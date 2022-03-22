const Express=require('express');
const passport=require('passport')
const bcrypt=require('bcrypt')
const router=Express.Router();
const userClient=require('../models/usersClients');
const buyerClient=require('../models/buyerClient')
const Views=require('../models/commodities/views')
const watchtime=require('../models/commodities/watchtime');
const subscribe=require('../models/commodities/subscribe');
const innitiate=require('./passport-local');
innitiate(passport, async email=>{
    const emailer= await buyerClient.findOne({Email:email})
    return emailer
})


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
router.get('/auth/second/google',
  passport.authenticate('google-alt', { scope:
      [ 'email', 'profile' ] }
));
router.get( '/second/google/callback',
    passport.authenticate( 'google-alt', {
        successRedirect: '/auth/second/google/success',
        failureRedirect: '/auth/second/google/failure'
}));

const check=(req,res,next)=>{
    if (!req.user) {
        
        res.redirect('/login')

        
    } else {
        next(); 
    }
}

const check2=(req,res,next)=>{
        
    buyerClient.find().then((results)=>{
         const buyer12=results.includes()
        if (!req.user && !buyer12) {
        
            res.redirect('/auth/second/google')
        
            
        } else {
            next();
          
        }
  })  
  
}



router.get('/auth/google/success',(req,res)=>{
    res.redirect('/seller');

})

router.get('/auth/google/failure',(req,res)=>{
    res.redirect('/login');

})
router.get('/auth/second/google/success',(req,res)=>{
    console.log(profile);
    res.redirect('/buyer');

})
router.get('/auth/second/google/failure',(req,res)=>{
    res.redirect('/buyer');

})
router.get('/buyer',check2,(req,res)=>{
    let user1= req.user.googleid;
    buyerClient.findOne({googleid:user1}).then((results)=>{
        res.render('buyer',{buyerClient:results})
    })
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


router.get('/buyerLogin',(req,res)=>{

    res.render('buyerLogin')
})
router.post('/buyerLogin',passport.authenticate('local',{
       successRedirect:'/',
       failureRedirect:'/buyerLogin',
       failureFlash: true
}))
router.post('/buyerLogin1',async(req,res)=> {
 
  
    try {
        const hashedPassword= await bcrypt.hash(req.body.password,10);
        new buyerClient={
          Email:req.body.email,
          phoneNumber:req.body.phone,
          password: hashedPassword 
        }
      buyerClient.save().then((results)=>{
        redirect('/buyerLogin1')
      })
    } catch (error) {
        console.log(error)
    }


})

module.exports=router;