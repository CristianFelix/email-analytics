var express = require('express');
var Account = require('./server/account.js');
var DB = require('./server/db.js');
var db = new DB();
var app = express();
var moment = require('moment');

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
	  response.sendFile(__dirname + '/login.html');
	})

	//Login --------------------
	app.get('/login', function(request, response) {
	  response.sendFile(__dirname + '/login.html');
	})

	app.get('/home', function(request, response) {
	  response.sendFile(__dirname + '/index.html');
	})

	app.get('/signin', function(request, response) {
		account = new Account();
	  	response.redirect(account.login());
	})

	app.get('/oauth', function(request, response) {
		var code = request.param('code')
		var account = new Account(code);
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

var user = "cristian.felix@gmail.com";
//API ------------------------------------------------------------------------------------
	app.get('/api/Histogram/', function(request, response) {
		db.histogram(user, function(result){
			response.json(result);
		}) 
	})
    
    app.get('/api/Summary', function(request, response) {
        var start = moment(request.param('start')).toDate();
        var end = moment(request.param('end')).toDate();
		db.summary(start, end,  user, function(result){
			response.json(result);
		}) 
	})
    
    
    app.get('/api/timeToAnswer', function(request, response) {
        var start = moment(request.param('start')).toDate();
        var end = moment(request.param('end')).toDate();
		db.timeToAnswer(start, end,  user, function(result){
			response.json(result);
		}) 
	})
    
    app.get('/api/frequentContacts', function(request, response) {
        var start = moment(request.param('start')).toDate();
        var end = moment(request.param('end')).toDate();
		db.frequent(start, end,  user, function(result){
			response.json(result);
		}) 
	})
    
    app.get('/api/summaryContact', function(request, response) {
        var start = moment(request.param('start')).toDate();
        var end = moment(request.param('end')).toDate();
        var contact = request.param('contact');
		db.ContactSummary(start, end,  user, contact, function(result){
			response.json(result);
		}) 
	})
    
    
    
    
    
    


























//Start ------------------------------------------------------------------------------------

	app.listen(app.get('port'), function() {
	  console.log("Node app is running at localhost:" + app.get('port'))
	})

