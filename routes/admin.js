const express = require('express');
const router = express.Router();
const { MongoClient} = require('mongodb');
const client = require('../config/mongo');
const alert = require('alert');
const dbName= 'sookp';
const cookieParser = require('cookie-parser');
const fs = require('fs');
const multer = require('multer');
const { getEnabledCategories } = require('trace_events');
const upload =multer({dest:"uploads/"})
const ObjectId = require('mongodb').ObjectId;


//////////////////middleware
router.use((req,res,next)=>{
  ////////whitelisting ip address and will use cron to delete
const sesh= req.ip;
console.log(sesh)
fs.readFile('tmp/whitelist.txt',(err,data)=>{
if (err){
  console.log(err)
}
 else if(data.indexOf(req.ip)>=0){
    console.log('whitelisted');
    
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
///////////////////////////////////
router.get('/login', function(req, res) {
  res.render('login', { title: 'login' });
  });
//////////////////////////////////
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
   const blogs= await client.db(dbName).collection('blogs').find().toArray();
    res.render('admin', {title:'Admin Page', data:data, blogs:blogs})
   }
  })

///////////////multer
 router.post('/upload',upload.single('photo'), function(req,res){
  //isolate file extention
  const imageData= req.file;
  const ogStr=0;
  const str = imageData.originalname;
  const str2 = imageData.filename;
  const strSplit= str.split('.');
  const ext = strSplit[1];
  const oldFilepath = "/sevn/uploads/";
  const newFilepath = "./sevn/public/images/blog/"
  const newName = 'blog_Image_'+ Date.now()+"."+ext;
  const bImgName = "images/blog/"+newName;
  console.log(imageData)
  fs.rename(oldFilepath+str2,newFilepath+newName,(err)=>{
if(err){
  console.log(err)
}
    console.log('file name changed and rerouted')
  })
  async function saveBlog(bImgName,data){
    try {
      await client.connect();
      await createBlog(client,{
        bTitle:req.body.title,
        postDate:Date.now(),
        bSubtitle:req.body.subtitle,
        bDetails:req.body.details,
        imgName:bImgName
      });
     }
     catch(err){
       console.log(err)
     }
     finally{
     await client.close();
   }}
   //calling the function
   saveBlog(bImgName).catch(console.error);
   async function createBlog(client,newBlog){
    const result = await client.db(dbName).collection('blogs').insertOne(newBlog);
    res.redirect('admin')
   
    }
     }
)
//////////DELETE BLOGS
router.post('/delBlog',(req,res)=>{
  async function deleteBlog(){
    try{
      await client.connect();
      await getBlog(client);  
    }
    catch(err){
      console.log(err)
    }
    finally{
      await client.close()
    }
  }
  deleteBlog().catch(console.error);
  async function getBlog(client){
    const newID =ObjectId(req.body.blogDelete)
  const deleteIt = await client.db(dbName).collection('blogs').deleteOne({"_id":newID})
  
  //const results = await client.db(dbName).collection('blogs').find({"id":req.body.blogDelete}) 
  const data = await client.db(dbName).collection('registry').find().toArray();
    const blogs= await client.db(dbName).collection('blogs').find().toArray();
    console.log()
res.redirect('admin')
  //res.render('admin',{title:'removed!!\n'+req.body.blogDelete, data:data, blogs:blogs})
  }
})
module.exports = router;