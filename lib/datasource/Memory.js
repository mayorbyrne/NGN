var Base	  	= require('./Connection');

/**
 * @class NGN.datasource.Memory
 * Represents a connection to system RAM/memory. Simple JavaScript variables can be used to store
 * temporary/volatile information in RAM, such as:
 * 		var x = 1;
 * However; simple variables like this aren't always well-suited for sharing access to the stored 
 * value across a JavaScript application, especially with the nested callback nature of asynchronous programming.
 * This connection object provides all of the features of a NGN.datasource.Connection.
 * As a result, it is possible to access a specific variable outside of a callback function by referencing
 * the datastore's application ID. For example,
 * 
 * 		NGN.application(function(){
 * 			var ds = new NGN.datasource.Memory({
 *					id: 'ram'
 *				});
 * 		
 * 			var client = ds.getClient();
 *			
 * 			client.key = 'value';
 * 		});
 * In any other file (such as a web request or API route), the value can be accessed by referencing the datasource:
 * 		var data = NGNA.getDSN('ram').getClient();
 * 		
 * 		console.log(data.key); // Outputs 'value'
 * **NOTICE**
 * 
 * Though all of the features of a normal datasource connection are available, not all of them are practical. For example,
 * the host name and port commonly used to connect to remote data stores are `null` because there is no remote host or
 * special protocol required to access RAM.
 * @extends NGN.datasource.Connection
 * @requires mongodb
 * @docauthor Corey Butler
 */
var Class = Base.extend({
    
    /**
     * @constructor
     * Create a new connection to the datasource.
     */
    constructor: function( config ){
        
        // Default configuration
        config = config || {};
       
        // Inherit parent object
        Class.super.constructor.call( this, config );
                
        // Self reference
        var me = this;
        
        // Set default connection attributes
        this.type    = 'Memory';
        
        delete this.client
        
        // Additional properties of MongoDB
        Object.defineProperties(this,{
        	
        	/**
        	 * @property {Any} [store=null]
        	 * The attribute that stores raw data in RAM.
        	 * @private
        	 */
        	client: {
        		value:		{},
        		enumerable:	true,
        		writable:	true
        	}
        	
        });
	}
    
});

// Create a module out of this.
module.exports = Class;
