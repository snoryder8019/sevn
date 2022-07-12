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
 })

module.exports = router;
