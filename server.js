const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
// create express app
const app = express();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "lin-1816-1906-mysql-primary.servers.linodedb.net",
  user: "scottw",
  password: process.env.DBPASS,
  database:"test"

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT user, host FROM mysql.user", function (err, result) {
    if (err) throw err;
    console.log("run querry");
    console.log(result);
  });
});
