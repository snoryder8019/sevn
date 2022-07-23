const express = require('express');
const router = express.Router();
const { MongoClient} = require('mongodb');
const client = require('../config/mongo');
const alert = require('alert');
const dbName= 'sookp';
const cookieParser = require('cookie-parser');
const fs = require('fs');


//middleware
router.use((req,res,next)=>{
  ////////whitelisting ip address and will use cron to delete
const sesh= req.ip;
console.log(sesh)
fs.readFile('tmp/whitelist.txt',(err,data)=>{
if (err){
  console.log(err)
}
 else if(data.indexOf(req.ip)>=0){
    console.log('whitelisted')
  }
  else{
    res.render('login',{title:"session timeout"})
  }
})
next();
})
////////////////////////////////////
router.post('/loginU', (req,res)=>{
  console.log('admin root')
  if (req.body.user===process.env.LOGIN && req.body.loginpass===process.env.LOGINPASS){
    const whitelist = req.ip+" "+ Date.now()+", \n";
    fs.appendFile('tmp/whitelist.txt',whitelist,(err)=>{
      if(err){
        console.log(err)
      }
      else{
  console.log('appended to whitelist')
      }
    })
  
    console.log('password accepted')
    res.redirect('admin')
  }else{
    console.log('credentials failed')
    res.render('login',{title:"credentials failed"});
  }
})
////////////////////////////////////
router.get('/admin', (req,res) =>{
   async function gettingEmails(){
    try {
     await client.connect();
     await getEmails(client);
    }
    catch(err){
      console.log(err)
    }
    finally{
    await client.close();
  }}
  //calling the function
  gettingEmails().catch(console.error);
  async function getEmails(client){
   // const dataStr = await client.db(dbName).collection('registry').find({"type": {$in:['registry']}}).toArray();
    const data = await client.db(dbName).collection('registry').find().toArray();
    res.render('admin', {title:'Admin Page', data:data})
   }
  })


module.exports = router;