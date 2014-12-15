var DB = require(__dirname + '/db.js');
var Gmail2 = require(__dirname + '/Gmail2.js');
var db = new DB();
var moment = require('moment');
var user = "cristian.felix@gmail.com";
var GmailLib = require('node-gmail-api')
var working = false;  

var Account = function (code) {
	var self = this;
	var g = new Gmail();
	self.connected = false; 
	self.idade = "";
	self.code = "";

	self.init = function(){
		self.code = code;
	}

	self.connect = function(callback){
		g.getAccessToken(self.code, function(){callback()});
	}
	
	
	self.getUser = function(callback){
		//console.log("connect")
		self.connect(function(){
			//console.log(self.code);
			self.connected = true; 
			//console.log("profile")
			g.getProfile(function(response){
				self.user = response;
				if(!response){
					callback(false);
				} else {
					//console.log(response);
					//console.log("dbgetuser")
					db.getUser(response, function(dbUser, isNew){
						//console.log(self.code);
						//console.log("refresh")
						self.refresh(self.code, dbUser);
						//console.log("callback")
						callback(dbUser);
					})
				}
				
			})
		});
	}

	self.login = function (){
		g = new Gmail();
		g.getUrl();
		return g.getUrl();
	}

	self.refresh = function(code){
		
		g.getMessages(function(result){
			console.log(result);
		});
	}

	self.init();
}


var Gmail = function () {
	var self = this;
	var CLIENT_ID = '725334101405-lqt8ql4mnst9or2mv0pc2asnbj7imjfv.apps.googleusercontent.com';
	var CLIENT_SECRET = 'LkOOB2hu5GXIlbl9fz9g1vSu';
	var REDIRECT_URL = 'http://localhost:5000/oauth';

	var google = require('googleapis');
	var OAuth2Client = google.auth.OAuth2;
	var gmail = google.gmail('v1');
	var oauth2 = google.oauth2('v2');
	var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
	
	self.tokens = "";
	var count = 1;

	self.messages = [];

	self.addMesssage = function(message){
		self.messages.push(convertMesssage(message));
	}

	self.convertMesssage = function(message){
		var dbm = {};
		dbm._id =  message.id;
		dbm.threadId = message.threadId;
		dbm.historyId = message.historyId;
		dbm.snippet = message.snippet;

		dbm.Subject = self.getHeader(message.payload.headers, "Subject");

		var day = moment(self.getHeader(message.payload.headers, "Date")).toDate();
		dbm.date = day;
		dbm.from = self.ExtractContact(self.getHeader(message.payload.headers, "From"));

		var arrTo = self.ExtractContacts(self.getHeader(message.payload.headers, "To"));
		var arrCC = self.ExtractContacts(self.getHeader(message.payload.headers, "Cc"));
		if(arrCC)
			dbm.to = arrTo.concat(arrCC);
		else
			dbm.to = arrTo;
		
		

		if(contains(message.labelIds, "UNREAD"))
			dbm.unread = true;
		else
			dbm.unread = false;

		if(contains(message.labelIds, "STARRED"))
			dbm.starred = true;
		else
			dbm.starred = false;
        
        dbm.user = user;
        
		return dbm;

	}

	self.ExtractContact = function(c){

		try {
			parts = c.split("<");
		    if(parts.length > 1){
			    contact = {
			        name: parts[0],
			        email: parts[1].substring(0,parts[1].length-1),
			        domain: parts[1].substring(0,parts[1].length-1).split("@")[1]
			    }
			    return contact;
			} else {
				contact = {
			        name: c,
			        email: c,
			        domain: c.split("@")[1]
			    }
			    return contact;
			}
		} catch (e){
			return c;
		}
	}

	self.ExtractContacts = function(value){
		try {
			var rawContacts = value.split(',');
			rawContacts = rawContacts.map(function(c){
			    parts = c.split("<");
			    if(parts.length > 1){
			    	
				    contact = {
				        name: parts[0],
				        email: parts[1].substring(0,parts[1].length-1),
				        domain: parts[1].substring(0,parts[1].length-1).split("@")[1]
				    }
				    return contact;
				} else {
					
					contact = {
				        name: c,
				        email: c,
				        domain: c.split("@")[1]
				    }
				    
				    return contact;
				}
			})
			return rawContacts;
		} catch(e){
			return value;
		}
	}

	self.getHeader = function(headers, Name){
		for(i =0; i < headers.length; i++){
			if(headers[i] && headers[i].name && headers[i].name == Name)
				return headers[i].value;
		}
		return false;

	}

	function contains(a, obj) {
		if(!a)
			return false;

	    for (var i = 0; i < a.length; i++) {
	        if (a[i] === obj) {
	            return true;
	        }
	    }
	    return false;
	}

	self.printHeaders = function(headers){
		for(i =0; i < headers.length; i++){
			console.log(headers[i]);
		}
		return false;

	}

	self.getMessages = function(callback){
		var query = 'after: 2014-1-1';
		gmail2 = new Gmail2(self.tokens.access_token);
		working = true;
		var  s = gmail2.messages(query)
		self.getAllPages(gmail2, s, query);
		console.log( 'part 1');

	}

	self.getAllPages = function(client, s, query){
        console.log( 'part 2');
		s.on('data', function (d) {
			try{
				db.saveMessages(self.convertMesssage(d));
			} catch(e){
				console.log(e);
				console.log(d);
				console.log("============================")
			}
			  //self.addMesssage(d);
			  count++;
		});
		s.on('end', function (d) {
			
			if(client.nextPageToken) {
				working = true;
				var  s2 = client.messages(query)
				self.getAllPages(client, s2, query);

			} else {
				working = false;
				console.log("Done");
			}
		})
	}

	self.getMessage = function (id, callback){
		gmail.users.messages.get({ userId: 'me', id: id, format: "metadata", auth: oauth2Client }, function(err, msg) {
			msg._id = msg.id;
			db.addMesssage(msg);
		});
	}

	self.getAccessToken = function(code, callback) {
		oauth2Client.getToken(code, function(err, tokens) {
			console.log(err);
			self.tokens = tokens;
			oauth2Client.setCredentials(tokens);
			callback();
		});
	}

	self.getProfile = function(callback){ 
		if(oauth2Client.credentials == null){
			callback(false);
		} else {
			oauth2Client.refreshAccessToken(function(){
				gmail.users.getProfile({ userId: 'me', auth: oauth2Client }, function(err, userinfo) {
					if(err){
						console.log(err);
					} else {

						oauth2.userinfo.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
							userinfo.profile = profile;
							callback(userinfo);
						})

						
					}
				})
			});
		}
	}

	self.getUrl = function(){
		var url = oauth2Client.generateAuthUrl({
			access_type: 'offline', 
			scope: ['https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/userinfo.profile' ]
			
		});
		return url;
	}
}


module.exports = Account;