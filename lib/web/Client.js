var fs			= require('fs'),
	Base		= require('../core/HttpClient');

/**
 * @class NGN.web.Client
 * Provides a standard HTTP request interface for making requests over HTTP/S.  
 * 
 * This is based on the [request](https://github.com/mikeal/request) module.
 * 
 * 	   @example
 * 	   var client = new NGN.web.Client();
 * 		
 *     client.GET('http://www.google.com',function(error, response, body) {
 * 			if (!error && response.statusCode == 200) {
 *   				console.log(body) // Print the google web page.
 * 			}
 *     });
 * 
 * Requests 
 * 
 * @docauthor Corey Butler
 * @extends NGN.core.HttpClient
 */
var Class = Base.extend({
	
	/**
	 * @constructor
	 * Create a HTTP request client.
	 */
	constructor: function(config){
		
		config = config || {};
		
		Class.super.constructor.call( this, config );
		
		// Merge request module
		var request = require('request');
		this.merge(request);
		
		this.addEventListeners([
			'BeforeDownload',
			'BeforeUpload',
			'AfterDownload',
			'AfterUpload'
		]);
	
	},
		
	/**
	 * @method get
	 * Execute a `GET` request.
	 * @param {Object} [options]
	 * Documentation copied from [request module documentation](https://github.com/mikeal/request#requestoptions-callback).
	 * 
	 * * The first argument can be either a url or an options object. The only required option is uri, all others are optional.
	 * * `uri` || `url` - fully qualified uri or a parsed url object from url.parse()
	 * * `qs` - object containing querystring values to be appended to the uri
	 * * `method` - http method, defaults to GET
	 * * `headers` - http headers, defaults to {}
	 * * `body` - entity body for POST and PUT requests. Must be buffer or string.
	 * * `form` - sets `body` but to querystring representation of value and adds `Content-type: application/x-www-form-urlencoded; charset=utf-8` header.
	 * * `json` - sets `body` but to JSON representation of value and adds `Content-type: application/json` header.
	 * * `multipart` - (experimental) array of objects which contains their own headers and `body` attribute. Sends `multipart/related` request. See example below.
	 * * `followRedirect` - follow HTTP 3xx responses as redirects. defaults to true.
	 * * `followAllRedirects` - follow non-GET HTTP 3xx responses as redirects. defaults to false.
	 * * `maxRedirects` - the maximum number of redirects to follow, defaults to 10.
	 * * `encoding` - Encoding to be used on `setEncoding` of response data. If set to `null`, the body is returned as a Buffer.
	 * * `pool` - A hash object containing the agents for these requests. If omitted this request will use the global pool which is set to node's default maxSockets.
	 * * `pool.maxSockets` - Integer containing the maximum amount of sockets in the pool.
	 * * `timeout` - Integer containing the number of milliseconds to wait for a request to respond before aborting the request	
	 * * `proxy` - An HTTP proxy to be used. Support proxy Auth with Basic Auth the same way it's supported with the `url` parameter by embedding the auth info in the uri.
	 * * `oauth` - Options for OAuth HMAC-SHA1 signing, see documentation above.
	 * * `strictSSL` - Set to `true` to require that SSL certificates be valid. Note: to use your own certificate authority, you need to specify an agent that was created with that ca as an option.
	 * * `jar` - Set to `false` if you don't want cookies to be remembered for future use or define your custom cookie jar (see examples section)
	 * 
	 * @param {Function} [callback]
	 * Documentation copied from [request module documentation](https://github.com/mikeal/request#requestoptions-callback).
	 * The callback argument gets 3 arguments. The first is an error when applicable (usually from the http.Client option not the http.ClientRequest object). The second in an http.ClientResponse object. The third is the response body String or Buffer.
	 */
	
	/**
	 * @method put
	 * Execute a `PUT` request.
	 * @param {Object} [options]
	 * See #get options.
	 * @param {Function} [callback]
	 * See #get callback.
	 */
	
	/**
	 * @method post
	 * Execute a `POST` request.
	 * @param {Object} [options]
	 * See #get options.
	 * @param {Function} [callback]
	 * See #get callback.
	 */
	
	/**
	 * @method del
	 * Execute a `DELETE` request.
	 */
	
	/**
	 * @method head
	 * Execute a `HEAD` request.
	 */
	
	
	/**
	 * @method
	 * Not currently implemented.
	 * @param {String} source
	 * The absolute path of the file or directory on the server from which the file(s) will be uploaded.
	 * @param {String} uri
	 * The destination URI where the file(s) will be delivered.
	 */
	upload: function(source,uri) {
		this.onBeforeUpload();
		this.onAfterUpload();
	},
	
	/**
	 * @method
	 * Download/`GET` a file from a remote URL/URI. 
	 * 
	 * **Usage**
	 * 		var client = new NGN.web.Client();
	 * 
	 * 		client.download('http://www.google.com/logo.jpg','/path/to/image.jpg','overwrite');
	 *  
	 * This method instructs the client to utilize the [streaming](https://github.com/mikeal/request#streaming) 
	 * capabilities of the request module. It will automatically open a write stream to create
	 * the file. The `conflict` argument dictates what happens if the specified file already exists.
	 * @param {String} url
	 * The URL of the resource to download.
	 * @param {String} path
	 * The absolute path of the directory on the local file system where the file will be saved. This may
	 * be something like `/path/to/files` or `C:\Users\username\Downloads`.
	 * @param {String} [conflict=error]
	 * Dictates what happen when the specified file conflicts with an existing file of the same name.
	 * Optional values are:
	 * 
	 * * `error` The file is not saved and an error is thrown. This aborts the request.
	 * * `skip` The file is not saved and no error is thrown.
	 * * `overwrite` The existing file will be overwritten.
	 * * `append` The existing file will be appended with the new content.
	 * * `unique` A new file name will be created. For example, if `/path/to/image.jpg` already exists,
	 * the content will instead be written to `/path/to/image1.jpg`.
	 * @param {Function} [callback]
	 * The callback is passed a two arguments, a {@link Boolean} indicating `success` and
	 * the `filepath`.
	 * 
	 * 		var client = new NGN.web.Client();
	 * 
	 * 		var handleResponse = function(success, filepath) {
	 * 			if (success)
	 * 				console.log('File Saved!', filepath);
	 * 			else
	 * 				console.log('File Not Saved!');
	 * 		}
	 * 
	 * 		client.GET('http://www.google.com/logo.jpg').saveAs('/path/to/image.jpg','unique',handleResponse);
	 * 	
	 * The `filepath` is `null` if `conflict` is either `error` or `skip`.
	 */
	download: function(url, path, conflict, callback) {
		
		var me = this;
		
		callback = callback || function(){};
		if (typeof conflict === 'function'){
			callback = conflict;
			conflict = 'error';
		}
		
		// Check to see if the file already exists
		var file = path+'/'+this.getFileFromPath(url);
		
		this.fireEvent('beforedownload');
		fs.exists(file,function(exists){
			if (!exists){
				try {
					fs.createWriteStream(file).pipe(this.GET(url));
					me.fireEvent('afterdownload',true,file);
					callback(true,file);
				} catch (e) {
					callback(false);
					me.fireError(e);
				}
			} else {
				switch(conflict.trim().toLowerCase()){
					case 'overwrite':
						try {
							fs.createWriteStream(file).pipe(this.GET(url));
							me.fireEvent('afterdownload',true,file);
							callback(true,file);
						} catch (e) {
							callback(false);
							me.fireError(e);
						}
						break;
					case 'append':
						try {
							fs.createWriteStream(file,{flags:'r+'}).pipe(this.GET(url));
							me.fireEvent('afterdownload',true,file);
							callback(true,file);
						} catch (e) {
							callback(false);
							me.fireError(e);
						}
						break;
					case 'skip':
						callback(false);
						break;
					case 'unique':
						var fnm = this.getFileFromPath(url).split('.'),
							ext = fnm[fnm.length-1];
							
						fnm.pop();
						
						var base = fnm.join('.'),
							ct	 = 1;
							
						var nm = base+ct+'.'+ext;
						
						while(fs.existsSync(path+'/'+nm)){
							ct++;
							nm = base+ct+'.'+ext;
						}
						
						try {
							fs.createWriteStream(path+'/'+nm).pipe(this.GET(url));
							me.fireEvent('afterdownload',true,path+'/'+nm);
							callback(true,path+'/'+nm);
						} catch (e) {
							callback(false);
							me.fireError(e);
						}
						
						break;
					default:
						callback(false);
						me.fireError('Download failed. File already exists');
						break;
						
				}
			}
		});
	},
	
	/**
	 * @event beforedownload
	 * Fired before a download begins. 
	 */
	onBeforeDownload: function(){
		this.emit('beforedownload',this);
	},
	
	/**
	 * @event beforeupload
	 * Fired before an upload begins. 
	 */
	onBeforeUpload: function(){
		this.emit('beforeupload',this);
	},
	
	/**
	 * @event afterdownload
	 * Fired before a download begins. 
	 */
	onAfterDownload: function(){
		this.emit('afterdownload',this);
	},
	
	/**
	 * @event afterupload
	 * Fired before an upload begins. 
	 */
	onAfterUpload: function(){
		this.emit('afterupload',this);
	}
});



// Create a module out of this.
module.exports = Class;
