import express from 'express';
import sqlite from 'sqlite';

var app = express();
const dbPromise = sqlite.open('./db.sqlite', { Promise });

app.get('/', function (req, res) {
   res.send('Hello World');
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