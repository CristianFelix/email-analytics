var express = require('express')
var Account = require('./server/account.js')
var app = express();


app.set('port', (process.env.PORT || 5001))

app.use("/css", express.static(__dirname +'/css'));
app.use("/src", express.static(__dirname +'/src'));
app.use("/imgs", express.static(__dirname +'/imgs'));
app.use("/views", express.static(__dirname +'/views'));


//End Temp ---------------

//Routes ------------------------------------------------------------------------------------
	app.get('/api/getHistogram', function(request, response) {
	   var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
    if(err) throw err;
    var collection = db.collection('histogram');

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        response.send(results);
        // Let's close the db
        db.close();
      });
    });
  })
  
  	app.get('/api/getContacts', function(request, response) {
	   var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
    if(err) throw err;

    var collection = db.collection('contacts');

      // Locate all the entries using find
     collection.find({'Contacts.email' : "tim@apple.com"}).toArray(function(err, results) {
        response.send(results);
	
	/*collection.update({email: "bill@microsoft.com"}, {$set: {Name: "iReallyLoveMongo"}}, function(err, updated) {
	  if( err || !updated ) console.log("User not updated");
	  else console.log("User updated");
	});	
	*/
	        // Let's close the db
        db.close();
      });	
    });
  });
  
    app.get('/api/getSummary', function(request, response) {
	var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

  MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
    if(err) throw err;

    var collection = db.collection('summary');

      // Locate all the entries using find
     collection.find({'Summary.MostActive.Day' : "Tue"}).toArray(function(err, results) {
        response.send(results);
        // Let's close the db
        db.close();
      });	
    });
  });
  

	
	


	

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'))
	})

