var fs	 = require('fs'),
	Base = require('./Server');

/**
 * @class NGN.core.HttpServer
 * A generic utility/base class representing a HTTP server.
 * This class typically isn't invoked directly. It is designed as a base class
 * for different server types like NGN.web.Server, NGN.web.APIServer, etc.
 * @private
 * @extends NGN.core.Server
 */
var Class = Base.extend({
	
	/**
	 * @constructor
	 * Create a new server.
	 * @params {Object} config
	 */
	constructor: function(config){
		
		config = config || {};
		
		config.type = 'HTTP';
		
		Class.super.constructor.call(this, config);
		
		Object.defineProperties(this,{
			
			/**
			 * @property {Object}
			 * The core server object.
			 * @private
			 * @readonly
			 */
			_server: {
				value:		{},
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @property {Object}
			 * The core server options object.
			 * @private
			 * @readonly.
			 */
			_serverOptions: {
				value:		config.ssl || null,
				enumerable:	false,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {String/Array} routes (required)
			 * Path to directory where routes are stored. Also accepts an 
			 * array of file paths. Routes are created by recursively
			 * processing each specified directory and importing each `.js` file
			 * it finds. Supports relative and absolute paths.
			 */
			routes: {
				value:		config.routes || [],
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Object} [ssl=null]
			 * The certificate and key used for encrypting HTTP**S** traffic.
			 * 
			 * 		{
			 * 			cert: 	'/path/to/cert.pem',
			 * 			key:	'/path/to/key.pem',
			 * 			ca:		'/path/to/ca.crt' // Optional
			 * 		}
			 * For more information about generating SSL certificates, please see the [NGN Command Line Interface Guide](#!/guide/cli). 
			 */
			ssl: {
				value:		config.ssl || null,
				enumerable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Boolean} [requireClientSsl=false]
			 * Require a client/browser SSL certificate to access the server.
			 */
			requireClientCert: {
				value:		__NGN.coalesce(config.requireClientSsl,false),
				enumerable:	true,
				writable:	true
			},
			
			/**
			 * @cfg {Boolean} [rejectUnauthorizedClientCert=false]
			 * Reject a client connection if the certificate presented is not assigned by the CA cert (see #ssl), has expired, or has been revoked.
			 * 
			 * **Only applicable when #requireClientSsl is** `true`**.**
			 */
			rejectUnauthorizedCert: {
				value:		__NGN.coalesce(config.rejectUnauthorizedClientCert,false),
				enumerable:	true,
				writable:	true
			},
			
			/**
			 * @cfg {Number} [port=80|443]
			 * The port on which the web server will listen. Each web server must
			 * listen on a unique port. If no port is defined, the default port `80`
			 * will be used. If #ssl is supplied, the port will be set to `443` by default. 
			 */
			port: {
				value:		config.port || (this.ssl == null ? 80 : 443),
				enumerable:	true,
				writable:	true
			},
			
			/**
			 * @property {Object}
			 * The raw HTTP Server.
			 * @readonly
			 * @private
			 */
			_httpServer: {
				value:		null,
				enumerable:	false,
				writable:	true
			},
			
			/**
			 * @cfg {Boolean} [enableCompression=false]
			 * Compress output sent to the browser using gzip.
			 */
			enableCompression: {
				value:		__NGN.coalesce(config.enableCompression,false),
				enumerable:	true,
				writable:	true
			},
			
			/**
			 * @cfg {Function}
			 * A middleware function designed for authenticating client requests before processing them.
			 * 
			 * The function will receive three arguments, including `request`, `response`, and `next` (optional).
			 * If the function returns `false`, the server will respond with a `401 - Unauthorized`. If it returns
			 * `true`, processing continues.
			 * 
			 * **Example**
			 * 		var memberIds = [123,456,789,1011,1213]; 
			 * 		
			 * 		{
			 * 			authenticate: function(req,res,next){
			 * 				if (memberIds.indexOf(req.user.id) !== -1) {
			 * 					return true;
			 * 				} else {
			 * 					return false;
			 * 				}
			 * 			}
			 * 		}
			 * 
			 * If the application requires custom authentication responses (such as sending a `403 -Forbidden` instead of `401`), this configuration 
			 * should be ignored. A custom #preRequestMiddleware method can be used instead.
			 * 
			 */
			authenticate: {
				value:		config.authenticate || function(req,res,next){next()},
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Function}
			 * A middleware function designed for authorizing client requests before processing them. This is always
			 * executed _after_ #authenticate.
			 * 
			 * The function will receive three arguments, including `request`, `response`, and `next` (optional).
			 * If the function returns `false`, the server will respond with a `401 - Unauthorized`. If it returns
			 * `true`, processing continues.
			 * 
			 * **Example**
			 * 		var adminIds = [123,456]; 
			 * 		
			 * 		{
			 * 			authorize: function(req,res,next){
			 * 				if (adminIds.indexOf(req.user.id) !== -1) {
			 * 					return true;
			 * 				} else {
			 * 					return false;
			 * 				}
			 * 			}
			 * 		}
			 * 
			 * If the application requires custom authentication responses (such as sending a `403 -Forbidden` instead of `401`), this configuration 
			 * should be ignored. A custom #preRequestMiddleware method can be used instead.
			 * 
			 */
			authorize: {
				value:		config.authorize || function(req,res,next){next();},
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			_ALLOWCORS: {
				value:		config.allowCrossOrigin || null,
				enumerable:	false,
				writable:	true
			},
			
			
			_ALLOWMETHODS: {
				value:		config.allowMethods || null,
				enumerable:	false,
				writable:	true
			},
			
			/**
			 * @cfg {Boolean/String/Array} [enableCrossOrigin=false]
			 * Set to `true` to enable requests from all origins. Alternatively,
			 * provide a {String} domain, such as `my.safedomain.com` or `my.safedomain.com, other.domain.net`. 
			 * Also accepts an array of domains:
			 * 
			 * 		['first.safedomain.com','second.safedomain.com']
			 */
			enableCrossOrigin: {
				enumerable: true,
				get:		function(){ return this._ALLOWCORS; },
				set:		function(value){
								if (typeof value === 'boolean'){
									this._ALLOWCORS = value == true ? '*' : null;
								} else {
									this._ALLOWCORS = Array.isArray(value) == true ? value.join() : value;
								}
							}
			},
			
			/**
			 * @cfg {String/Array}
			 * Restrict traffic to specific HTTP methods/verbs such as `GET`,`POST`,`PUT`,`DELETE`, and `TRACE`.
			 * By default, everything is allowed. Only configure this when the application needs to explicitly
			 * use a limited number of verbs. For example, a read-only site may set this to `GET`.
			 */
			enableMethods: {
				enumerable: true,
				get:		function(){ return this._ALLOWMETHODS; },
				set:		function(value){
								this._ALLOWMETHODS = (Array.isArray(value) == true ? value.join() : value).toUpperCase();
							}
			},
			
			/*
			 * @cfg {Object}
			 * A key/value object containing custom middleware functions executed before.  
			 */
			/*preRequestMiddleware: {
				value:		config.middleware || {},
				enumerable:	true,
				configurable:true
			}*/
			
			/**
			 * @cfg {Object}
			 * A key/value object containing `<username>:<password>`.
			 * 
			 * **Example**
			 * 		{
			 * 			jdoe: 'password1',
			 * 			msmith: 'password2',
			 * 			bpatel: 'password3'
			 * 		} 
			 * By providing a basic authorization map, the server will automatically enable BasicAuth restrictions.
			 * These are applied _instead of_ #authenticate and #authorize middleware, unless BasicAuth is explicitly
			 * disabled using #disableBasicAuth. It is possible to configure code with all three auth middleware features and
			 * toggle them on/off by enabling/disabling BasicAuth. However; most applications only require one feature.      
			 */
			basicAuthUsers: {
				value:		config.basicAuthUsers || null,
				enumerable:	false,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Boolean} [basicAuthCaseSensitive=true]
			 * When using #basicAuthUsers, all password matching will be done with respect to upper/lower case.
			 */
			basicAuthCaseSensitive: {
				value:		__NGN.coalesce(config.basicAuthCaseSensitive,true),
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Boolean} [enableBasicAuth=false]
			 * Setting this to true will require basic authentication before completing a request. This should be 
			 * used in conjunction with #basicAuthUsers. If no users are specified, every request will fail!
			 * 
			 * Basic authentication is executed _before_ #authenticate and #authorize.
			 */
			disableBasicAuth: {
				value:		__NGN.coalesce(config.enableBasicAuth,false),
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @cfg {Function/Array/NGN.web.Processor} [processors=[]]
			 * Supply a middleware function, processor, or array of functions/processors.
			 */
			processor: {
				value:		config.processors || config.processor || [],
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @property {Boolean}
			 * Indicates custom request processors have been configured.
			 */
			_hasProcessors: {
				value:		false,
				enumerable:	false,
				writable:	true
			}
			
		});
		
		if (!Array.isArray(this.processor)){
			this.processor = [this.processor];
		}
		for(var i=0;i<this.processor.length;i++){
			if (this.processor[i].type == undefined)
				this.processor[i] = new __NGN.web.Processor({fn:this.processor[i]});
		}
		
		if (this.requireClientCert || this.rejectUnauthorizedCert) {
			this._serverOptions = this._serverOptions || {};
			this._serverOptions.requireClientCert = true;
		
			if (this.rejectUnauthorizedCert)
				this._serverOptions.rejectUnauthorizedCert = true;
		}
		
	},
	
	/**
	 * @method
	 * Apply a middleware processor to the server.
	 */
	applyProcessor: function(type){
		var me = this;
		for(var i=0;i<this.processor.length;i++){
			if (this.processor[i].type == type && !this.processor[i]._used){
				this._server.use(me.processor[i].processor);
				this.processor[i].used = true;
			}
		}
	},
	
	/**
	 * @method
	 * Add a custom middleware function or request processor.
	 * @param {Function/NGNX.web.processor}
	 */
	addprocessor: function(rp){
		if (rp.type == undefined)
			this.processor.push(new __NGN.web.Processor({fn:rp}));
		else
			this.processor.push(rp);
	},
	
	/**
	 * @method
	 * A basic authentication method for testing a user against the #basicAuthUsers mapping.
	 * @param {String} username
	 * @param {String} password
	 * Plain text password.
	 * @returns {Boolean}
	 */
	testBasicAuth: function(username, password) {
		if (disaleBasicAuth)
			return true;
		
		if (this.basicAuthUsers[username] == undefined)
			return false;
		
		if (!this.basicAuthCaseSensitive) {
			if (this.basicAuthUsers[username].toLowerCase() == password.toLowerCase())
				return true;
		} else if (this.basicAuthUsers[username] == password)
			return true;
		
		return false;
	},
	
	/**
	 * @method
	 * Generates server routes. If no #routes are configured, a generic
	 * route will be created for the URL root.
	 * @param {Function} [callback]
	 * The callback sends a single {Boolean} argument to a method indicating a root route has been created. 
	 * @returns {Boolean}
	 */
	generateRoutes: function(callback) {
		return this._generateRoutes(callback);
	},
	
	/**
	 * @method
	 * Generates server routes. If no #routes are configured, a generic
	 * route will be created for the URL root.
	 * @private
	 * @param {Function} [callback]
	 * The callback sends a single {Boolean} argument to a method indicating a root route has been created. 
	 * @returns {Boolean}
	 */
	_generateRoutes: function(callback){

		callback = callback || null;
		
		var me = this;
		
		// Create a mapper
		if (!this._server.hasOwnProperty('map')){
			Object.defineProperty(this._server,'map',{
				value:		function(a, route){
								route = route || '';
						  		for (var key in a) {
						  			if (a.hasOwnProperty(key)) {
							    		switch (typeof a[key]) {
							  				case 'object':
							    				me._server.map(a[key], route + key);
							   					break;
											case 'function':
												
												//console.log('%s %s', key, route);
							    				//me._server[key](route, a[key]);
							    				
							    				// Add special pointer variables for simpler processing.
							    				// If the route is a regex, support it
							    				if (route.trim().substr(0,1) == route.substr(route.trim().length-1,1) == '/')
								    				route = new RegExp(route.trim().substr(1,route.trim().length-2));
	
										    	me._server[key.toLowerCase()](route,a[key]);
							    				break;
										}
									}
								}
							},
				enumerable: true,
				writable:	false
			});
		}
		
		// If the routes configuration provides an array of filepaths, loop
		// through them to process them all
		this.routes = (typeof this.routes == 'string' ? this.routes.split(',') : this.routes);
	
		var _hasRootRoute = false;
		if (Array.isArray(this.routes)) {
			for (var i=0; i<this.routes.length; i++) {	
	
				// Loop through the directories and add each JS file, assuming each is a route.
				var rt = this.routes[i].trim();
				
				// Attempt to load absolute path first. Then local path.
				if (fs.existsSync(__NGN.path.resolve(rt)))
					rt = __NGN.path.resolve(rt);
				else
					rt = __NGN.path.resolve(__NGN.path.join(__NGN.cwd,rt));

				// If a path is defined, make sure it exists.
				if (!fs.existsSync(rt)){
					this.fireError('The route path does not exist or could not be found. '+rt);
					return;
				}
				
				// Sync Route Loader
				var filepath = require('wrench').readdirSyncRecursive(rt);
				for (var n=0;n<filepath.length;n++){					
					if (filepath[n].substr(filepath[n].length-3,3).toLowerCase() == '.js' && filepath[n].toString().trim().toLowerCase() !== 'root.js'){
						var _rt = require(__NGN.path.join(rt,filepath[n]));
						if (!_hasRootRoute && _rt['/'] !== undefined)
							_hasRootRoute = true;
						this._server.map(_rt);
					}
				}

				if (!_hasRootRoute && require('fs').existsSync(__NGN.path.join(rt,'root.js'))) {
					var _rt = require(__NGN.path.join(rt,'root.js'));
					if (!_hasRootRoute && _rt.hasOwnProperty('/'))
						_hasRootRoute = true;
					this._server.map(_rt);			
				}
			}
		} else {
			if (this.routes.hasOwnProperty('/'))
				_hasRootRoute = true;
			this._server.map(this.routes);
		}
		
		if (callback !== null)
			callback(_hasRootRoute);
		else
			return _hasRootRoute;
	},
	
	/**
     * @event sessionstart
     * Fired when a user session starts. 
     */
    onSessionStart: function(){
    	this.fireEvent('sessionstart');
    },
    
    /**
     * @event sessionend
     * Fired when a session ends.
     */
    onSessionEnd: function(){
    	this.fireEvent('sessionend');
    },
    
    /**
     * @event requeststart
     * Fired when a request starts.
     */
    onRequestStart: function(req){
    	this.emit('requeststart',req||null);
    },
    
    /**
     * @event requestend
     * Fired just before the request ends
     */
    onRequestEnd: function(req,res){
    	this.emit('requestend',{request:req||null,response:res||null});
    },
	
	/**
	 * @event 1xx
	 * Fired on every HTTP 100-level response.
	 */
	on1xx: function(code,res){
		this.emit('1xx',{code:code,response:(response||null)});
		this.onXXX(code,response||null);
	},
	
	/**
	 * @event 100
	 * Fired on HTTP Status Code 100
	 */
	on100: function(response){
		this.emit('100',{code:100,response:(response||null)});
		this.on1xx(100,response||null);
	},
	
	/**
	 * @event 101
	 * Fired on HTTP Status Code 101
	 */
	on101: function(response){
		this.emit('101',{code:101,response:(response||null)});
		this.on1xx(101,response||null);
	},
	
	
	/**
	 * @event 2xx
	 * Fired on every HTTP 200-level response.
	 */
	on2xx: function(code,response){
		this.emit('2xx',{code:code,response:(response||null)});
		this.onXXX(code,response||null);
	},
	
	/**
	 * @event 200
	 * Fired on HTTP Status Code 200
	 */
	on200: function(response){
		this.emit('200',{code:200,response:(response||null)});
		this.on2xx(200,response||null);
	},
	
	/**
	 * @event 201
	 * Fired on HTTP Status Code 201
	 */
	on201: function(response){
		this.emit('201',{code:201,response:(response||null)});
		this.on2xx(201,response||null);
	},
	
	/**
	 * @event 202
	 * Fired on HTTP Status Code 202
	 */
	on202: function(response){
		this.emit('202',{code:202,response:(response||null)});
		this.on2xx(202,response||null);
	},
	
	/**
	 * @event 203
	 * Fired on HTTP Status Code 203
	 */
	on203: function(response){
		this.emit('203',{code:203,response:(response||null)});
		this.on2xx(203,response||null);
	},
	
	/**
	 * @event 204
	 * Fired on HTTP Status Code 204
	 */
	on204: function(response){
		this.emit('204',{code:204,response:(response||null)});
		this.on2xx(204,response||null);
	},
	
	/**
	 * @event 205
	 * Fired on HTTP Status Code 205
	 */
	on205: function(response){
		this.emit('205',{code:205,response:(response||null)});
		this.on2xx(205,response||null);
	},
	
	/**
	 * @event 206
	 * Fired on HTTP Status Code 206
	 */
	on206: function(response){
		this.emit('206',{code:206,response:(response||null)});
		this.on2xx(206,response||null);
	},
	
	/**
	 * @event 3xx
	 * Fired on every HTTP 300-level response.
	 */
	on3xx: function(code,response){
		this.emit('3xx',{code:code,response:(response||null)});
		this.onXXX(code,response||null);
	},
	
	/**
	 * @event 300
	 * Fired on HTTP Status Code 300
	 */
	on300: function(response){
		this.emit('300',{code:300,response:(response||null)});
		this.on3xx(300,response||null);
	},
	
	/**
	 * @event 301
	 * Fired on HTTP Status Code 301
	 */
	on301: function(response){
		this.emit('301',{code:301,response:(response||null)});
		this.on3xx(301,response||null);
	},
	
	/**
	 * @event 302
	 * Fired on HTTP Status Code 302
	 */
	on302: function(response){
		this.emit('302',{code:302,response:(response||null)});
		this.on3xx(302,response||null);
	},
	
	/**
	 * @event 303
	 * Fired on HTTP Status Code 303
	 */
	on303: function(response){
		this.emit('303',{code:303,response:(response||null)});
		this.on3xx(303,response||null);
	},
	
	/**
	 * @event 304
	 * Fired on HTTP Status Code 304
	 */
	on304: function(response){
		this.emit('304',{code:304,response:(response||null)});
		this.on3xx(304,response||null);
	},
	
	/**
	 * @event 305
	 * Fired on HTTP Status Code 305
	 */
	on305: function(response){
		this.emit('305',{code:305,response:(response||null)});
		this.on3xx(305,response||null);
	},
	
	/**
	 * @event 306
	 * Fired on HTTP Status Code 306
	 */
	on306: function(response){
		this.emit('306',{code:306,response:(response||null)});
		this.on3xx(306,response||null);
	},
	
	/**
	 * @event 307
	 * Fired on HTTP Status Code 307
	 */
	on307: function(response){
		this.emit('307',{code:307,response:(response||null)});
		this.on3xx(307,response||null);
	},
	
	/**
	 * @event 4xx
	 * Fired on every HTTP 400-level response.
	 */
	on4xx: function(code,response){
		this.emit('4xx',{code:code,response:(response||null)});
		this.onXXX(code,response||null);
	},
	
	/**
	 * @event 400
	 * Fired on HTTP Status Code 400
	 */
	on400: function(response){
		this.emit('400',{code:400,response:(response||null)});
		this.on4xx(400,response||null);
	},
	
	/**
	 * @event 401
	 * Fired on HTTP Status Code 401
	 */
	on401: function(response){
		this.emit('401',{code:401,response:(response||null)});
		this.on4xx(401,response||null);
	},
	
	/**
	 * @event 402
	 * Fired on HTTP Status Code 402
	 */
	on402: function(response){
		this.emit('402',{code:402,response:(response||null)});
		this.on4xx(402,response||null);
	},
	
	/**
	 * @event 403
	 * Fired on HTTP Status Code 403
	 */
	on403: function(response){
		this.emit('403',{code:403,response:(response||null)});
		this.on4xx(403,response||null);
	},
	
	/**
	 * @event 404
	 * Fired on HTTP Status Code 404
	 */
	on404: function(response){
		this.emit('404',{code:404,response:(response||null)});
		this.on4xx(404,response||null);
	},
	
	/**
	 * @event 405
	 * Fired on HTTP Status Code 405
	 */
	on405: function(response){
		this.emit('405',{code:405,response:(response||null)});
		this.on4xx(405,response||null);
	},
	
	/**
	 * @event 406
	 * Fired on HTTP Status Code 406
	 */
	on406: function(response){
		this.emit('406',{code:406,response:(response||null)});
		this.on4xx(406,response||null);
	},
	
	/**
	 * @event 407
	 * Fired on HTTP Status Code 407
	 */
	on407: function(response){
		this.emit('407',{code:407,response:(response||null)});
		this.on4xx(407,response||null);
	},
	
	/**
	 * @event 408
	 * Fired on HTTP Status Code 408
	 */
	on408: function(response){
		this.emit('408',{code:408,response:(response||null)});
		this.on4xx(408,response||null);
	},
	
	/**
	 * @event 409
	 * Fired on HTTP Status Code 409
	 */
	on409: function(response){
		this.emit('409',{code:409,response:(response||null)});
		this.on4xx(409,response||null);
	},
	
	/**
	 * @event 410
	 * Fired on HTTP Status Code 410
	 */
	on410: function(response){
		this.emit('410',{code:410,response:(response||null)});
		this.on4xx(410,response||null);
	},
	
	/**
	 * @event 411
	 * Fired on HTTP Status Code 411
	 */
	on411: function(response){
		this.emit('411',{code:411,response:(response||null)});
		this.on4xx(411,response||null);
	},
	
	/**
	 * @event 412
	 * Fired on HTTP Status Code 412
	 */
	on412: function(response){
		this.emit('412',{code:412,response:(response||null)});
		this.on4xx(412,response||null);
	},
	
	/**
	 * @event 413
	 * Fired on HTTP Status Code 413
	 */
	on413: function(response){
		this.emit('413',{code:413,response:(response||null)});
		this.on4xx(413,response||null);
	},
	
	/**
	 * @event 414
	 * Fired on HTTP Status Code 414
	 */
	on414: function(response){
		this.emit('414',{code:414,response:(response||null)});
		this.on4xx(414,response||null);
	},
	
	/**
	 * @event 415
	 * Fired on HTTP Status Code 415
	 */
	on415: function(response){
		this.emit('415',{code:415,response:(response||null)});
		this.on4xx(415,response||null);
	},
	
	/**
	 * @event 416
	 * Fired on HTTP Status Code 416
	 */
	on416: function(response){
		this.emit('416',{code:416,response:(response||null)});
		this.on4xx(416,response||null);
	},
	
	/**
	 * @event 417
	 * Fired on HTTP Status Code 417
	 */
	on417: function(response){
		this.emit('417',{code:417,response:(response||null)});
		this.on4xx(417,response||null);
	},
	
	/**
	 * @event 5xx
	 * Fired on every HTTP 500-level response.
	 */
	on5xx: function(code,response){
		this.emit('5xx',{code:code,response:(response||null)});
		this.onXXX(code,response||null);
	
	},
	
	/**
	 * @event 500
	 * Fired on HTTP Status Code 500
	 */
	on500: function(response){		
		this.emit('500',{code:500,response:(response||null)});
		this.on5xx(500,response||null);
	},
	
	/**
	 * @event 501
	 * Fired on HTTP Status Code 501
	 */
	on501: function(response){
		this.emit('501',{code:501,response:(response||null)});
		this.on5xx(501,response||null);
	},
	
	/**
	 * @event 502
	 * Fired on HTTP Status Code 502
	 */
	on502: function(response){
		this.emit('502',{code:502,response:(response||null)});
		this.on5xx(502,response||null);
	},
	
	/**
	 * @event 503
	 * Fired on HTTP Status Code 503
	 */
	on503: function(response){
		this.emit('503',{code:503,response:(response||null)});
		this.on5xx(503,response||null);
	},
	
	/**
	 * @event 504
	 * Fired on HTTP Status Code 504
	 */
	on504: function(response){
		this.emit('504',{code:504,response:(response||null)});
		this.on5xx(504,response||null);
	},
	
	/**
	 * @event 505
	 * Fired on HTTP Status Code 505
	 */
	on505: function(response){
		this.emit('505',{code:505,response:(response||null)});
		this.on5xx(505,response||null);
	},
	
	/**
	 * @event xxx
	 * Fired on every HTTP response.
	 */
	onXXX: function(code,response){
		this.emit('xxx',{code:code,response:(response||null)});
	},
	
	/**
	 * @event beforerequest
	 * Fired before a request.
	 * @param {Object} req
	 * Request stream object.
	 */
	onBeforeRequest: function(req){
		this.emit('beforerequest',req||null);
	},
	
	/**
	 * @event afterrequest
	 * Fired after a request.
	 * @param {Object} req
	 * Request stream object.
	 */
	onAfterRequest: function(req){
		this.emit('afterrequest',req);
	}
	
});

module.exports = Class;