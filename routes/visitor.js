const express = require('express');
const app = express();
const router = express.Router();
const { MongoClient} = require('mongodb');
const client = require('../config/mongo');
const alert = require('alert');
const { locals } = require('../app');
const dbName= 'sookp';



router.use('/',(req,res, next)=>{
next();
})

router.post('/visitor', (req,res)=>{
const clickID=req.body.buttonID;
console.log(clickID);
   async function gettingEmails(clickID){
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
  gettingEmails(clickID).catch(console.error);
  async function getEmails(client){
  const data = await client.db(dbName).collection('registry').findOne({email:clickID});

 res.render('./visitor',{title:"visitor Here", data:data})
   }

})

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
    const data =emailStr;
     console.log();
    res.render('admin',{title:'removed!!\n'+req.body.delConfirm, data:data})
  }
})
//////////////////
router.post('/adminHit',(req,res)=>{
  res.redirect('../admin')
})

  module.exports=router;