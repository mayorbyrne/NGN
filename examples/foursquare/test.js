require('../../');
require('url');

console.log('Running NGN v'.yellow+NGN.version.toString().yellow);
/**
 * A simple custom app config
 * This isn't actually used for anything developer-friendly yet...
 * but it will be used to log application messages, send notices to
 * an admin, etc. The config could get pretty lengthy.
 */
var appConfig = {
        name: 'Foursquare Test',
        administrator: {
                name: 'Kevin Moritz',
                email: 'kevinecor@gmail.com'
        }
}; 

// Define the application
// The config is optional, but it's good practice to take 
// advantage of other goodies later.
//NGN.application(appConfig, function(){  // NGN applications enable the "application" scope
        
        var port = 83;
        
        var web = new NGN.web.Server ({
            id:            'fours',    // NGN now automatically registers servers by ID. It is automatically recognized as a web server.
            routes:        './routes', // NGN.web.Server now supports relative routes
            port:          port,
            autoStart:     false,
            views:         './views',
            viewEngine:    'jade',
    //        processors:    new NGNX.web.WebRequestHelper() // A new processor that makes route processing a little simpler
        });
            
        web.on('start',function(){
            console.log('The server is ready & waiting on port '.green+port.toString().green.bold);
        });
        
        // Define a foursquare configuration ONCE for the whole application.
        var fs = {
            clientid:       'client_id=1NYV4034WJALZWQGNXOYS1ZL0WKMRR534Z1AMWBWWH2A2QY0',
            secretid:       'client_secret=0AW3SP1BBZ3MSCQE5MUYEIUW4S1S4AEXMQHH1UGNTCWI1CKF',
            host:           'https://api.foursquare.com/v2/'
        };
        
        web.start();
//});