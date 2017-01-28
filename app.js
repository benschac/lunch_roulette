var hackerschool = require('hackerschool-api'),
    app = require('express')();

var client = hackerschool.client();


// Lunch Roulette -- original
var auth = hackerschool.auth({
  client_id: '8eda5ac4eafc60396782220bc509636951c4281139f3f505d744240d7782e95b',
  client_secret: '6e7b4f95a8cd2d04e9772d689c46a2d6f083bbc69f62355470faad11897fdc17',
  redirect_uri: 'urn:ietf:wg:oauth:2.0:oob'
});


// var auth = hackerschool.auth({
//   client_id: '89e7f0de384b9f7d19a458d620381f9dd78719113ca4308464e6bb7f1046e926',
//   client_secret: '9732b88ca4038c6f23553fb37723a61a97006b729642547c3467fd21c8e0ef12',
//   redirect_uri: 'http://localhost:3000/oauthCallback'
// });

app.get('/login', function(req, res) {
  var authUrl = auth.createAuthUrl();

  // redirect the user to the auth page
  res.redirect(authUrl);
});

app.get('/oauthCallback', function(req, res) {
  var code = req.query.code;
console.log('whatever');
  auth.getToken(code)
  .then(function(token) {
    // tells the client instance to use this token for all requests
    client.setToken(token);
    res.redirect('/');
    console.log('abc');
  }, function(err) {
    console.log('asdf');
    res.send('There was an error getting the token');
  });
});

app.get('/', (req, res) => {
  client.batches.list()
.then(function(batches) {
res.send(batches);
});

});

app.listen(3000);
