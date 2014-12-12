var Future = require('fibers/future');
var fs = Future.wrap(require('fs'));
var wait = Future.wait;

var Account = function (code) {
	var self = this;
	var g = new Gmail();
	self.calls = 0;

	self.init = function(){
		if(code){
			var future = new Future;
			console.log('gettingToken');
			g.getAccessToken(code, function(){console.log('tokenCallback'); future.return();});
			return future.wait();
		}
		self.wait();

		
    		setTimeout(function() {
        		
    		}, ms);
    	

	}

	

	self.getUser = function(){
		console.log('looking user');
		
		var user = {};
		g.getProfile(function(response){
			user = response;
		});
		return user;
	}

	self.login = function (){
		g = new Gmail();
		g.getUrl();
		return g.getUrl();
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
	var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

	self.getAccessToken = function(code, callback) {
		oauth2Client.getToken(code, function(err, tokens) {
			oauth2Client.setCredentials(tokens);
			console.log('gotToken');
			callback();

		});
	}

	self.getProfile = function(callback){ 
		console.log('getProfile');
			gmail.users.getProfile({ userId: 'me', auth: oauth2Client }, function(err, response) {
			if(err){
				console.log(err);
			} else {
				callback(response);
			}
		})
	}

	self.getUrl = function(){
		var url = oauth2Client.generateAuthUrl({
			access_type: 'offline', // will return a refresh token
			scope: 'https://www.googleapis.com/auth/gmail.readonly' // can be a space-delimited string or an array of scopes
		});
		return url;
	}
}


module.exports = Account;