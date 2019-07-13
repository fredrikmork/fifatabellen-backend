var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var app = express();

app.use(bodyParser.json())

app.get('/', function (req, res) {
   res.send('Hello World');
   
})

//Get user
app.post('/user/login', function (req, res){
   var username = req.body.username;
   var password = req.body.password;
   var db = new sqlite3.Database('./db.sqlite');
   db.all(`SELECT passwordHash FROM user WHERE name = "${username}"`, function(err, rows ) {
      var dbHash = rows[0].passwordHash;
      bcrypt.compare(password, dbHash, function(err, result){
         if(result){
            res.send("token");
         }
         res.status(403).send()
         
      })
   })
   db.close();
   
})

//Create user
app.post('/user', function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   bcrypt.hash(password, 10, function(err, hash) {
      const uuidv4 = require('uuid/v4');
      var db = new sqlite3.Database('./db.sqlite');
      db.all(`INSERT INTO user (id, name, passwordHash) VALUES ("${uuidv4()}","${username}","${hash}")`);
      db.close();
    });
    res.status(204).send()
})

app.get('/user/:userId', function (req, res) {
    // call db with req.params[userId]
    var userId = req.params[userId]
    var user = {}
    res.send(user)
 })

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})