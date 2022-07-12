var express = require('express');
var router = express.Router();
const { MongoClient} = require('mongodb');
var client = require('../config/mongo');
const alert = require('alert')
const app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homie Dont Play dat on the Homescreen' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' });
});
router.get('/login', function(req, res, next) {
res.render('login', { title: 'login' });
});
router.get('/admin',function(req,res,next){
  res.render('admin',{title: 'admin'})
<<<<<<< HEAD
 })
=======
 
})
router.post('/registerUser', (req,res) => {




  
  var ipHit = req.ip;


  async function main(){
   try {
    await client.connect();
   // await checkEmail(client);
 
    await createUser(client,{
      name: req.body.fname,
      email: req.body.email,
      password : req.body.password
    });
  }catch (err){
    console.log(err)
  }finally{
    await client.close();
  }
  }
////
  main().catch(console.error);
///
async function checkEmail(client){
  const emailCheck = await client.db('sookp').collection('registry').findOne({email:req.body.email});
if(emailCheck.email===req.body.email){
  
  
}else{
  console.log('mayken')}
}
///
    async function createUser(client,newUser){
      const emailCheck = await client.db('users').collection('registry').findOne({email:req.body.email});
      if(emailCheck){
        console.log(emailCheck);
        res.render('register',{title:'email taken'})
        throw Error('TAYKEN');
      
      }else{
   const result = await client.db("users").collection("registry").insertOne(newUser);
   console.log(' :new user\n id: '+result.insertedId+'\n email: '+ req.body.email+'\nIP:'+ipHit );
   res.render('login',{title:'thanks for registering'})}
   }





>>>>>>> a4d383d55955c78839627121a4704b04965f5d39

module.exports = router;
