require('./');
require('colors');
var foursq = new NGN.web.Server ({
	routes: __dirname+'/examples/webserver/routes/',
	port: 3000

});