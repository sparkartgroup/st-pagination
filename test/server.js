// start a static server so we can run AJAX tests
var http = require('http');
var connect = require('connect');

connect()
.use( connect.static( __dirname ) )
.listen( 9999 );

console.log('Test server running on 9999');