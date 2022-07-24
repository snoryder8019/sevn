var express = require('express');
var router = express.Router();
const { MongoClient} = require('mongodb');
var client = require('../config/mongo');
const alert = require('alert')
const app = express();
const dbName = 'sookp'
/* GET home page. */
router.get('/',(req, res, next)=> {
  async function gettingBlogs(){
    try {
     await client.connect();
     await getBlogs(client);
    }
    catch(err){
      console.log(err)
    }
    finally{
    await client.close();
  }}
  //calling the function
  gettingBlogs().catch(console.error);
  async function getBlogs(client){

   // const dataStr = await client.db(dbName).collection('registry').find({"type": {$in:['registry']}}).toArray();
    const data = await client.db(dbName).collection('blogs').find().toArray();
    res.render('index', {title:'Welcome', data:data})
   console.log(data[0])
  }
});



// router.get('/404', function(req, res, next) {
// res.render('404', { title: 'Daaaaang its a 404' });
// });


module.exports = router;
