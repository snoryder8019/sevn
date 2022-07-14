var express = require('express');
var router = express.Router();
const { MongoClient} = require('mongodb');
var client = require('../config/mongo');
const alert = require('alert')
const app = express();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page Content' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'register' });
});
router.get('/login', function(req, res, next) {
res.render('login', { title: 'login' });
});
router.get('/404', function(req, res, next) {
res.render('404', { title: 'Daaaaang its a 404' });
});


module.exports = router;
