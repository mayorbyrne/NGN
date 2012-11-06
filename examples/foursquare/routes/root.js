        var fs = {
            clientid:       'client_id=1NYV4034WJALZWQGNXOYS1ZL0WKMRR534Z1AMWBWWH2A2QY0',
            secretid:       'client_secret=0AW3SP1BBZ3MSCQE5MUYEIUW4S1S4AEXMQHH1UGNTCWI1CKF',
            host:           'https://api.foursquare.com/v2/',
            redirecturi:	'http://localhost:83'
        };

module.exports = {
        
        '/venuesearch/:latitude/:longitude':{
                
                get: function(req,res){
                	    var     endpoint = 'venues/',
                                task = 'search?',
                                lt =    req.params.latitude,     // Notice the route... this was added by the middleware helper in test.js
                                lng =   req.params.longitude,    // Notice the route... this was added by the middleware helper in test.js
                                amp =   '&',
                                v =     'v=20121024',
                                url =   fs.host            // Notice the application scope
                                                + endpoint
                                                + task
                                                + 'll='+lt+ ','
                                                + lng+amp
                                                + fs.clientid+amp
                                                + fs.secretid+amp
                                                + v;
				
                        var client = new NGN.web.Client();
                        
                        client.get(url, function (error, response, body) {

                               var venues = JSON.parse(body).response.venues || null;
               
                                if (venues == null) {
                                        res.send(400,'Invalid Location');
                                        return;
                                }
        
                                var output      = "";
                                for(var i=0;i<venues.length;i++){
                                        var venue  = venues[i];
                                        
                                        output += '<li>';
                                        
                                        if (venue.verified)
											output += '<b>';
										else
											output += '<font color="#666">';
											
                                        output += venue.name+': '+venue.location.lat+', '+venue.location.lng;
                						
                                        if (venue.verified)
											output += '</b>';
										else
											output += '</font>';
											
										output += '</li>';
                                }
                                
                                res.send(output);
                        });
                }
        },
        
        	
        '/':{	
        	get: function(req,res){
        		
    res.render('auth.jade', { title: 'Let\'s Authenticate!' });
 
			}
		},
		
		'/auth':{
			get: function(req,res){

				res.redirect('https://foursquare.com/oauth2/authenticate?'+fs.clientid+'&response_type=code&redirect_uri='+fs.redirecturi);
				console.log(req.headers.referer);
				res.end();
			}
			
		}

}

