var express = require('express');
var Account = require('./server/account.js');
var DB = require('./server/db.js');
var db = new DB();
var app = express();
var moment = require('moment');
console.log(moment("Fri, 12 Dec 2014 16:36:55 -0800 (PST)").toISOString());


app.set('port', (process.env.PORT || 5000))

app.use("/css", express.static(__dirname +'/css'));
app.use("/src", express.static(__dirname +'/src'));
app.use("/imgs", express.static(__dirname +'/imgs'));
app.use("/views", express.static(__dirname +'/views'));

//Temp
	app.get('/MainData.json', function(request, response) {
	  response.sendFile(__dirname + '/MainData.json');
	})

	app.get('/MainData2.json', function(request, response) {
	  response.sendFile(__dirname + '/MainData2.json');
	})
	app.get('/loading.gif', function(request, response) {
	  response.sendFile(__dirname + '/loading.gif');
	})
	app.get('/logo.png', function(request, response) {
	  response.sendFile(__dirname + '/logo.png');
	})
//End Temp ---------------

//Routes ------------------------------------------------------------------------------------
	app.get('/', function(request, response) {
		//console.log("/");
	  response.sendFile(__dirname + '/login.html');
	})

	//Login --------------------
	app.get('/login', function(request, response) {
		//console.log("/login");
	  response.sendFile(__dirname + '/login.html');
	})

	app.get('/home', function(request, response) {
		//console.log("/home");
	  response.sendFile(__dirname + '/index.html');
	})

	app.get('/signin', function(request, response) {
		//console.log("/signin");
		account = new Account();
	  	response.redirect(account.login());
	})

	app.get('/oauth', function(request, response) {
		//console.log("/oauth");
		var code = request.param('code')
		//console.log("2");
		var account = new Account(code);
		//console.log("3");
		account.getUser(function(user){
			console.log("Calling");
			if(!user){
				console.log("haveuser");
				response.redirect('/signin');
			} else {
				console.log("goinghome");
				response.redirect('/home');
			}
		})
	});

	function getUser(){

	}




	

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'))
	})

