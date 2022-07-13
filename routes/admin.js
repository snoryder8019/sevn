var express = require('express');
var router = express.Router();
const { MongoClient} = require('mongodb');
var client = require('../config/mongo');
const alert = require('alert');
const { json } = require('express');
const dbName= 'sookp'
//middleware
router.use((req,res,next)=>{
  console.log('unused admin middleware slot')
  next();
})
router.get('/', (req,res) =>{
  res.send
})
//
router.get('/admin', (req,res) =>{
  /******LOGIN ANSYNC*** */
async function gettingEmails(){
  try {
   await client.connect();
   console.log('connected')
   await getEmails(client);
  }
  catch(err){
    console.log(err)
  }
  finally{
   await client.close();
  }
}
/***login ASYNC END** */
//calling the function
gettingEmails().catch(console.error);
async function getEmails(client){
  console.log('checking email');
  const dataStr = await client.db(dbName).collection('registry').find({"type": {$in:['registry']}}).toArray();
  const emailStr = await client.db(dbName).collection('registry').find().toArray();
  const data = [JSON.stringify(dataStr)];
  const email = [JSON.stringify(emailStr.email)];
   console.log(" getting data from sook registry"+ "\nlist: "+email);
   res.render('admin', {title:' Welcome to Admin Page', data:data, email:email})
  client.close();
    }
  }
)

  module.exports = router;