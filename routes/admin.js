const express = require('express');
const router = express.Router();
const { MongoClient} = require('mongodb');
const client = require('../config/mongo');
const alert = require('alert');
const dbName= 'sookp';
const cookieParser = require('cookie-parser');


//middleware
router.use((req,res,next)=>{
  console.log('cookies', req.cookies)
  console.log('signed cookies', req.signedCookies)

next();
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
    const emailStr = await client.db(dbName).collection('registry').find().toArray();
    const email = emailStr;
    console.dir(req.params)
    res.render('admin', {title:'Admin Page', email:email})
   }
  })

///////////////////////////////
router.post('/delRegister',(req,res) =>{
  async function getUsertoDelete(){
 try{
    await client.connect();
  await findThem(client);
    }
  catch(err){
    console.log(err)
  }
  finally{
   await client.close()
 }}
getUsertoDelete().catch(console.error);
  async function findThem(client) {
    const whoGone = await client.db(dbName).collection('registry').deleteOne({"email":req.body.delConfirm})
    const emailStr = await client.db(dbName).collection('registry').find().toArray();
    const email =emailStr;
     console.log();
    res.render('admin',{title:'removed!!\n'+req.body.delConfirm, email:email})
  }
})
//////////////////
module.exports = router;