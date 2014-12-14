var DB = function(){
	var self = this;
	self.MongoClient = require('mongodb').MongoClient
    
    self.getUser = function(user, callback){
    	self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
    		var collection = db.collection('users');
	      	collection.findOne({email: user.email},function(err, results) {
	      		if(!results)
	      			collection.insert(user, function(err, objects) {
	      				callback(objects,true);
	      			});
	      		else
	      			callback(results, false);
		        db.close();
	    	});
	    });
	}

	self.saveMessages = function(messages, callback){
		self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
    		var collection = db.collection('emails');
	      	collection.save(messages, function(err, objects) {
  				if(callback)
  					callback(objects,true);
  			});
      	    db.close();
    	});
	}

	self.addMesssage = function(message, callback){
    	self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
    		var collection = db.collection('emails');
	      	collection.insert(message, function(err, objects) {
  				if(callback)
  					callback(objects,true);
  			});
      	    db.close();
    	});
	}





}


module.exports = DB;

