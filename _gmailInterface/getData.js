var readline = require('readline');
var Gmail = require('node-gmail-api');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var gmail = google.gmail('v1');

var CLIENT_ID = '725334101405-lqt8ql4mnst9or2mv0pc2asnbj7imjfv.apps.googleusercontent.com';
var CLIENT_SECRET = 'LkOOB2hu5GXIlbl9fz9g1vSu';
var REDIRECT_URL = 'http://www.example.com';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Replace this
var tokens = {
	access_token: 'ya29.2ACFfRnIzq7F3X3zaCslU_5-9krNXMdycycrFhR5uYEXR4K9obE5pwFgTPRaoBzF_Ik1Fo72qdZrCQ',
  	token_type: 'Bearer',
  	expiry_date: 1418241714960 
}


function getAccessToken(oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/gmail.readonly' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      console.log(tokens);
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}


oauth2Client.setCredentials(tokens);

var gmail2 = new Gmail(tokens.access_token)
  , s = gmail2.messages('label:inbox', {max: 10})


s.on('data', function (d) {
  console.log(d)
})

//console.log(gmail);
/*
gmail.users.threads.list({ userId: 'me', auth: oauth2Client }, function(err, response) {
	if(err){
		console.log(err);
	} else {
		console.log(response);
	}
})*/

console.log('done');

//=================================================






