var express = require('express')
var app = express();

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

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/login.html');
})

app.get('/home', function(request, response) {
  response.sendFile(__dirname + '/index.html');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
