var http = require("http");

var options = {
  host: 'server.zog.ro',
  port: 80,
  path: '/'
};

http.get(options, function(res) {
  console.log("Got response: " + res.statusCode);

  for(var item in res.headers) {
    console.log(item + ": " + res.headers[item]);
  }
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
