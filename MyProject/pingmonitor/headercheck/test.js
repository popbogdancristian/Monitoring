var server = require('http').createServer(function(req, res) {
  var headerStr =JSON.stringify(req.headers);
  
  // set response header
  res.setHeader('content-type', 'application/json');
  
  res.write(headerStr);
  res.end();
}); 
var port = process.env.PORT || 2525;
server.listen(port);
server.on('listening', function(){
  console.log('Listening to ', port);
}); 
