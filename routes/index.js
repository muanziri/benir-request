const express=require('express');
const views=require('../models/commodities/views')
const watchtime=require('../models/commodities/watchtime')
const subscribe=require('../models/commodities/subscribe')
const router=express.Router();


router.get('/',(req,res)=>{
    res.render('index');
})

router.post('/views',(req,res)=>{
   const {Videoid,channelId}=req.body;
  new views({
   videoId:Videoid,
   channelID:channelId
  }).save().then((results)=>{
      res.redirect('/')
  }).catch((err)=>{if(err)throw err})
})
router.post('/subscribe',(req,res)=>{
    const {channelUrl,channelName,Discription}=req.body;
   new subscribe({
    ChannelUrl:channelUrl,
    ChannelName:channelName,
    Discription:Discription

   }).save().then((results)=>{
       res.redirect('/')
   }).catch((err)=>{if(err)throw err})
 })
 router.post('/watchtime',(req,res)=>{
    const {Videoid,channelId}=req.body;
   new watchtime({
    videoId:Videoid,
    channelID:channelId
   }).save().then((results)=>{
       res.redirect('/')
   }).catch((err)=>{if(err)throw err})
 })
 


module.exports=router;

