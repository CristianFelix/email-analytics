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

	self.histogram = function(user, callback){
		self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
    		var collection = db.collection('emails');
	      	
			var result = collection.aggregate([    
        		{ $match: {to: { $ne: false}, user: user}},
				{ $project : 
				    { date : { 
				           year: { $year: "$date" },
				           month: { $month: "$date" },
				           day: { $dayOfMonth: "$date" },
				    }, 
				    sent : { $cond : { if : { $eq: ["$from.email", user]}, then: 1, else: 0}}, 
				    received : { $cond : { if : { $ne: ["$from.email", user]}, then: 1, else: 0}}
				}},
				{ $group : { _id: "$date", received:{$sum:"$received"}, sent : {$sum:"$sent"}}},
				{ $project : { _id : 0, date : "$_id", received : 1, sent : 1 }},
				{ $sort : { date : 1 }}
			]).toArray(function(err, docs) {
				if(err) throw err;
				callback(docs);
				db.close();
		    });
    	});
	}
    
    self.summary = function(start, end, user, callback){
        self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
            var collection = db.collection('threads');

            var summary = collection.aggregate([
                { $unwind: "$messages"},
                { $match: { user: user, "messages.date" : { $gte: start, $lt: end} }},
                { $unwind: "$messages.to"},
                { $group: { 
                    _id: "$messages._id" , 
                    direction: {$first: "$messages.direction"},
                    userReplied: {$first: "$messages.userReplied"},
                    avgReplied: { $avg: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }}} ,
                    avgSent: { $avg: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }}} 

                }},
                { $group: { 
                    _id: null, 
                    messages: {$sum: 1},
                    sent: { $sum: { $cond: { if: { $eq: ["$direction", "sent"] }, then: 1, else: 0 }}},
                    received: { $sum: { $cond: { if: { $eq: ["$direction", "received"] }, then: 1, else: 0 }}},
                    replied: { $sum: { $cond: { if: { $ne: ["$userReplied", null] }, then: 1, else: 0 }}},  
                    takeToReply : { $avg : { $cond: { if: { $eq: ["$avgReplied", 0]}, then: null, else: "$avgReplied" }}},
                    takeToBeAnswared : { $avg : { $cond: { if: { $eq: ["$avgSent", 0]}, then: null, else: "$avgSent" }}},
                }}
            ]).toArray(function(err, docs) {
                if(err) throw err;
                self.MostActiveDays(start, end, user, docs[0], collection, function(result){
                    db.close();
                    callback(result);
                });
            });
        });
    }
    
    self.ContactSummary = function(start, end, user, contact, callback){
        self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
            var collection = db.collection('threads');

            var summary = collection.aggregate([
                { $unwind: "$messages"},
                { $unwind: "$messages.to"},
                { $match: { user: user, 
                           "messages.date" : { $gte: start, $lt: end},
                           $or: [{ "messages.from.email": user}, {"messages.to.email": user }],
                           $or: [{ "messages.from.email": contact}, {"messages.to.email": contact }]
                          }},
                { $group: { 
                    _id: "$messages._id" , 
                    direction: {$first: "$messages.direction"},
                    userReplied: {$first: "$messages.userReplied"},
                    avgReplied: { $avg: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }}} ,
                    avgSent: { $avg: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }}} 

                }},
                { $group: { 
                    _id: null, 
                    messages: {$sum: 1},
                    sent: { $sum: { $cond: { if: { $eq: ["$direction", "sent"] }, then: 1, else: 0 }}},
                    received: { $sum: { $cond: { if: { $eq: ["$direction", "received"] }, then: 1, else: 0 }}},
                    replied: { $sum: { $cond: { if: { $ne: ["$userReplied", null] }, then: 1, else: 0 }}},  
                    takeToReply : { $avg : { $cond: { if: { $eq: ["$avgReplied", 0]}, then: null, else: "$avgReplied" }}},
                    takeToBeAnswared : { $avg : { $cond: { if: { $eq: ["$avgSent", 0]}, then: null, else: "$avgSent" }}},
                }}
            ]).toArray(function(err, docs) {
                if(err) throw err;
                if(docs.length == 0)
                    callback({});
                else {
                    console.log(docs[0]);
                    self.MostActiveDaysContact(start, end, user, contact, docs[0], collection, function(result){
                        db.close();
                        callback(result);
                    });
                }
            });
        });
    }
    
    
    
    self.timeToAnswer = function(start, end, user, callback){
         self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
            var collection = db.collection('threads');

                var timetoanswer = collection.aggregate([
                    { $unwind: "$messages"},
                    { $unwind: "$messages.to"},
                    { $match: { user: user, "messages.date" : { $gte: start, $lt: end}, $or: [{ "messages.from.email": user}, {"messages.to.email": user }]}},
                    { $project: { 
                        to: "$messages.to", 
                        from: "$messages.from", 
                        direction: "$messages.direction", 
                        contact:  { $cond: { if: { $eq: ["$messages.direction", "received"]}, then: "$messages.from", else: "$messages.to" }},
                        You:  { $cond: { if: { $eq: ["$messages.direction", "received"], $eq: ["$messages.to.email", user] }, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }},
                        Them:  { $cond: { if: { $eq: ["$messages.direction", "sent"]}, then: { $divide : [{$subtract: [ "$messages.to.replied", "$messages.date" ]}, 60000]}, else: null }}
                    }},
                    { $match: { 
                        $or : [
                            {You: {$ne : null } },
                            {Them: {$ne : null } },
                        ]}},
                    { $group: { _id: { name: "$contact.name", email: "$contact.email",domain:"$contact.domain"} , You: { $avg: "$You"} , Them: { $avg: "$Them" }}},
                    { $project: { _id: "$_id", 
                        You: { $cond: { if: { $eq:["$You", 0]}, then: "i", else: "$You" } } , 
                        Them: { $cond: { if: { $eq:["$Them", 0]}, then: "i", else: "$Them" } } }},
                    { $sort: { You: 1 }},
                    { $group: { _id: "$_id.domain", You: { $avg: "$You"} , Them: { $avg: "$Them" }, Contacts: { $push: "$$CURRENT"} }},
                    { $sort: { _id: 1 }}
                ]).toArray(function(err, docs) {
                    if(err) throw err;
                   
                        db.close();
                        callback(docs);
                    });
                });
    }
    
    
    self.frequent = function(start, end, user, callback){
         self.MongoClient.connect('mongodb://127.0.0.1:27017/email', function(err, db) {
	    	if(err) throw err;
            var collection = db.collection('threads');

                var frequent = collection.aggregate([
                    { $unwind: "$messages"},
                    { $unwind: "$messages.to"},

                    { $match: { user: user, "messages.date" : { $gte: start, $lt: end},  "messages.direction": "received" ,  $or: [{ "messages.from.email": user}, {"messages.to.email": user }]}},
                    { $project: {
                        _id: "$messages._id",
                        name: "$messages.from.name",
                        email: "$messages.from.email",
                        domain: "$messages.from.domain"
                    }},
                    { $group: {
                            _id: "$domain",
                            Contacts: { $push: { email: "$email", name: "$name" }},
                            messages: { $addToSet: "$_id" }
                     }},
                     { $unwind: "$messages"},
                     { $group: { _id: "$_id", count: {$sum: 1}, contact: { $first: "$Contacts"} }},
                     { $unwind: "$contact"},
                     { $group: { _id: { domain: "$_id", count: "$count",  contact: "$contact" }, count: {$sum: 1} }},
                     { $sort: { count: -1}},
                     { $group: { _id: "$_id.domain", count: {$first:"$_id.count"}, contacts: {$push: { name: "$_id.contact.name", email: "$_id.contact.email", count: "$count"   }}}},
                     { $sort: { count: -1}}
                ]).toArray(function(err, docs) {
                    if(err) throw err;
                    var result = { Received: docs} ;
                     var frequent = collection.aggregate([
                        { $unwind: "$messages"},
                        { $unwind: "$messages.to"},
                        { $match: { user: user, "messages.date" : { $gte: start, $lt: end},  "messages.direction": "sent" ,  $or: [{ "messages.from.email": user}, {"messages.to.email": user }]}},
                        { $project: {
                            _id: "$messages._id",
                            name: "$messages.to.name",
                            email: "$messages.to.email",
                            domain: "$messages.to.domain"
                        }},
                        { $group: {
                                _id: "$domain",
                                Contacts: { $push: { email: "$email", name: "$name" }},
                                messages: { $addToSet: "$_id" }
                         }},
                         { $unwind: "$messages"},
                         { $group: { _id: "$_id", count: {$sum: 1}, contact: { $first: "$Contacts"} }},
                         { $unwind: "$contact"},
                         { $group: { _id: { domain: "$_id", count: "$count",  contact: "$contact" }, count: {$sum: 1} }},
                          { $sort: { count: -1}},
                         { $group: { _id: "$_id.domain", count: {$first:"$_id.count"}, contacts: {$push: { name: "$_id.contact.name", email: "$_id.contact.email", count: "$count"   }}}},
                         { $sort: { count: -1}}
                        ]).toArray(function(err, docs) {
                            result.Sent = docs;
                            db.close();
                            callback(result);
                     });
                    });
                });
    }
    
    self.TopThreads = function(start, end, user, obj, collection, callback){
        var TopThreads = collection.aggregate([
            { $unwind: "$messages"},
            { $unwind: "$messages.to"},
            { $match: { user: user, "messages.date" : { $gte: start, $lt: end},  $or: [{ "messages.from.email": user}, {"messages.to.email": user }]}},
            { $group: { 
                _id: "$messages.threadId", 
                NumMsg: { $first: "$count" },
                To: { $addToSet: "$messages.to"},  
                From: { $addToSet: "$messages.from"},
                Subject: {$first: "$messages.Subject"},
                Date: { $first: "$messages.date"},
                Star: { $first: "$messages.starred"},
                Read: { $first: { $not: "$messages.starred"}}
            }},
            {$sort: { NumMsg: -1 }},
            {$limit: 5 }
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.TopThreads = docs.map(function(thread){
                thread.Contacts = thread.To;
                return thread;
            });
            callback(obj);
        });
    }
    
     self.TopThreadsContact = function(start, end, user, contact,  obj, collection, callback){
        var TopThreads = collection.aggregate([
            { $unwind: "$messages"},
            { $unwind: "$messages.to"},
            { $match: { user: user, 
                           "messages.date" : { $gte: start, $lt: end},
                           $or: [{ "messages.from.email": user}, {"messages.to.email": user }],
                           $or: [{ "messages.from.email": contact}, {"messages.to.email": contact }]
                          }},
            { $group: { 
                _id: "$messages.threadId", 
                NumMsg: { $first: "$count" },
                To: { $addToSet: "$messages.to"},  
                From: { $addToSet: "$messages.from"},
                Subject: {$first: "$messages.Subject"},
                Date: { $first: "$messages.date"},
                Star: { $first: "$messages.starred"},
                Read: { $first: { $not: "$messages.starred"}}
            }},
            {$sort: { NumMsg: -1 }},
            {$limit: 5 }
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.TopThreads = docs.map(function(thread){
                thread.Contacts = thread.To;
                return thread;
            });
            callback(obj);
        });
    }
    
    
    
    self.MostActiveDaysContact = function(start, end, user, contact,  obj, collection, callback){
        var MostActiveMDays = collection.aggregate([
            { $unwind: "$messages"},
             { $match: { user: user, 
                           "messages.date" : { $gte: start, $lt: end},
                           $or: [{ "messages.from.email": user}, {"messages.to.email": user }],
                           $or: [{ "messages.from.email": contact}, {"messages.to.email": contact }]
                          }},
            { $group: { 
                _id: { $dayOfMonth: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActiveMDays = docs.map(function(day){
                day.Day = day._id;
                delete day._id;
                return day;
            });
            self.MostActiveHoursContact(start, end, user, contact, obj, collection, callback);
        });
    }
    
    self.MostActiveDays = function(start, end, user, obj, collection, callback){
        var MostActiveMDays = collection.aggregate([
            { $unwind: "$messages"},
            { $match: { user: user, "messages.date" : { $gte: start, $lt: end}, $or: [{ "messages.from.email": user}, {"messages.to.email": user }]}},
            { $group: { 
                _id: { $dayOfMonth: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActiveMDays = docs.map(function(day){
                day.Day = day._id;
                delete day._id;
                return day;
            });
            self.MostActiveHours(start, end, user, obj, collection, callback);
        });
    }
    
    self.MostActiveHoursContact = function(start, end, user, contact, obj, collection, callback){
        var MostActiveHours = collection.aggregate([
            { $unwind: "$messages"},
            { $match: { user: user, 
                           "messages.date" : { $gte: start, $lt: end},
                           $or: [{ "messages.from.email": user}, {"messages.to.email": user }],
                           $or: [{ "messages.from.email": contact}, {"messages.to.email": contact }]
                          }},
            { $group: { 
                _id: { $hour: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActiveHours = docs.map(function(day){
                day.Hour = day._id;
                delete day._id;
                return day;
            });
            self.MostActiveContact(start, end, user, contact, obj, collection, callback);
        });
    }
    
    self.MostActiveHours = function(start, end, user, obj, collection, callback){
        var MostActiveHours = collection.aggregate([
            { $unwind: "$messages"},
            { $match: { user: user, "messages.date" : { $gte: start, $lt: end} }},
            { $group: { 
                _id: { $hour: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActiveHours = docs.map(function(day){
                day.Hour = day._id;
                delete day._id;
                return day;
            });
            self.MostActive(start, end, user, obj, collection, callback);
        });
    }
    
     self.MostActiveContact = function(start, end, user, contact, obj, collection, callback){
        var MostActive = collection.aggregate([
            { $unwind: "$messages"},
            { $match: { user: user, 
                           "messages.date" : { $gte: start, $lt: end},
                           $or: [{ "messages.from.email": user}, {"messages.to.email": user }],
                           $or: [{ "messages.from.email": contact}, {"messages.to.email": contact }]
                          }},
            { $group: { 
                _id: { $dayOfWeek: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActive = docs.map(function(day){
                switch (day._id) {
                    case 1:
                        day.Day = "Sun";
                        break;
                    case 2:
                        day.Day = "Mon";
                        break;
                    case 3:
                        day.Day = "Tue";
                        break;
                    case 4:
                        day.Day = "Wed";
                        break;
                    case 5:
                        day.Day = "Thu";
                        break;
                    case 6:
                        day.Day = "Fri";
                        break;
                    case 7:
                        day.Day = "Sat";
                        break;
                }
                delete day._id;
                return day;

            });
            self.TopThreadsContact(start, end, user, contact,  obj,  collection, callback)
            
        });
    }
    
    self.MostActive = function(start, end, user, obj, collection, callback){
        var MostActive = collection.aggregate([
            { $unwind: "$messages"},
            { $match: { user: user, "messages.date" : { $gte: start, $lt: end} }},
            { $group: { 
                _id: { $dayOfWeek: "$messages.date"},   
                Received: { $sum: { $cond: { if: { $eq: ["$messages.direction", "received"] }, then: 1, else: 0 }}} ,
                Sent: { $sum: { $cond: { if: { $eq: ["$messages.direction", "sent"] }, then: 1, else: 0 }}} 
            }},
            {$sort: {_id: 1}}
        ]).toArray(function(err, docs) {
            if(err) throw err;
            obj.MostActive = docs.map(function(day){
                switch (day._id) {
                    case 1:
                        day.Day = "Sun";
                        break;
                    case 2:
                        day.Day = "Mon";
                        break;
                    case 3:
                        day.Day = "Tue";
                        break;
                    case 4:
                        day.Day = "Wed";
                        break;
                    case 5:
                        day.Day = "Thu";
                        break;
                    case 6:
                        day.Day = "Fri";
                        break;
                    case 7:
                        day.Day = "Sat";
                        break;
                }
                delete day._id;
                return day;

            });
            self.TopThreads(start, end, user, obj, collection, callback)
            
        });
    }
}


module.exports = DB;

