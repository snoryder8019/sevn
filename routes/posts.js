var express = require('express');
var router = express.Router();
const app = express();
const { MongoClient} = require('mongodb');
var client = require('../config/mongo');
const alert = require('alert')
const dbName= 'sookp'
// const multer = require('multer');
// const upload = multer({dest:'tmp/uploads'});
// const path = require('path');
// const fs = require('fs')

//middleware
router.use((req,res,next)=>{
  next();
//fs to read photo file length
 })
router.get('/', (req,res) =>{
  res.send
})
//
router.post('/loginU', (req,res) =>{
  /******LOGIN ANSYNC*** */
async function login(){
  try {
    await client.connect();
   console.log('connected')
   await checkEmail(client);
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
login().catch(console.error);

async function checkEmail(client){
  console.log('checking email');
  const emailCheck = await client.db(dbName).collection('registry').findOne({email:req.body.email, pass:req.body.password});
  if(emailCheck.email===req.body.email && emailCheck.pass===req.body.pass){
   console.log(emailCheck.email+ " email validated");
   res.render('admin', {title:'logging IN!! ~ Welcome to Admin Page'})
}else{
  console.log('tayken')}
  res.render('login', {title:'hmm Something\'s is not Straight here. Try again'})
  client.close();
}
}
)
router.post('/registerUser', (req,res) => {
  var ipHit = req.ip;
  async function main(){
   try {
    await client.connect();
   // await checkEmail(client);
    await createUser(client,{
      type:"registry",
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
  const emailCheck = await client.db(dbName).collection('registry').findOne({email:req.body.email});
if(emailCheck.email===req.body.email){
}else{
  console.log('tayken')}
}
///
    async function createUser(client,newUser){
      const emailCheck = await client.db(dbName).collection('registry').findOne({email:req.body.email});
      if(emailCheck){
        console.log(emailCheck);
        res.render('register',{title:'email taken'})
        throw Error('TAYKEN');
            }else{
   const result = await client.db(dbName).collection("registry").insertOne(newUser);
   console.log(' :new user\n id: '+result.insertedId+'\n email: '+ req.body.email+'\nIP:'+ipHit );
   res.render('index',{title:'thanks for registering! redirected Home.'})}
   }
})

//multer trial
// router.post( '/upload',upload.single('photo'), (req,res, next)=>{
// //
// fs.readdir('./public/images/uploads', 'utf-8',(err,data)=>{
//   if (err){
//   console.log(err);
//   }
// const fileCount = data.length
//  })
// const ext = req.file.originalname.split(".")[1];
// const newFile = "uploadImage"+fileCount+"."+ext;
// console.log(newFile);
//   }
// );



  module.exports = router;