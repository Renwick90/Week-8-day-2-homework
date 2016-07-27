var express = require('express');
var app = express();
var mongodb = require('mongodb')
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var url = 'mongodb://localhost:27017/farm';
var ObjectID = mongodb.ObjectID
var path = require('path')
app.use(express.static('public'))

app.get ('/', function(req, res){

  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/animals', function(req, res){

  MongoClient.connect(url, function( err, db ){
    var collection = db.collection('animals');
    collection.find({}).toArray( function(err, docs){
      res.json(docs);
      db.close();
    })
  })
})

app.post('/animals', function(req, res){
  
  res.status(200).end();
  MongoClient.connect(url, function( err, db ){
  var collection = db.collection('animals');
  collection.insert( req.body)
  res.status(200).end();
  db.close()
})
});

app.put('/animals/:id', function(req, res){
  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.update( {_id: new ObjectID(req.params.id)}, {$set:req.body} )
    res.status(200).end();
    db.close();
  })
})


// app.put('/animals/:id', function(req, res){

//  MongoClient.connect(url, function( err, db ){
//  var collection = db.collection('animals');
//  collection.updateOne({_id: new ObjectID(req.params.id)}, {$set:{name:req.body.name, type:req.body.type}})
//  res.status(200).end();
//  db.close()
// })
// });


app.delete('/animals/:id', function(req, res){

 MongoClient.connect(url, function( err, db ){
 var collection = db.collection('animals');
 collection.remove({_id: new ObjectID(req.params.id)})
 res.status(200).end();
 db.close()
})
});






app.listen('3000', function(){
  console.log("running on 3000");
})