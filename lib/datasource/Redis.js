var redis       = require('redis'),
    Connection  = require('./Connection');

/**
 * @class NGN.datasource.Redis
 * Represents a connection to a Redis instance.
 * @extends NGN.datasource.Connection
 * @requires Redis
 * @docauthor Corey Butler
 */
var Class = Connection.extend({
    
    /**
     * @constructor
     * Create a new connection to a Redis instance.
     */
    constructor: function( config ){
        
        // Default configuration
        config = config || {};
       
        // Inherit parent object
        Class.super.constructor.call( this, config );
                
        // Self reference
        var me = this;
        
        // Set default connection attributes
        this.type    = 'Redis';
        
        /**
         * @cfg {String} [host=127.0.0.1]
         * The host server.
         */
        this.host    = config.host   || '127.0.0.1';
        
        /**
         * @cfg {Number} [port=6379]
         * The host port.
         */
        this.port    = config.port     || 6379;
        

    	/**
    	 * @cfg {Number} [database=1]
    	 * The database index to use when creating a connection. 
    	 */
    	this.database = config.database || 1;
        
        /**
         * @property
         * @readonly
         * @protected
         * The underlying [Redis client](https://github.com/mranney/node_redis) used to interact with the Redis database instance. 
         */
        Class.super.client = this.autoConnect == true ? redis.createClient( this.port, this.host ) : {connected:false}
        
        // Create a secure connection if a password is provided.
        if (this.autoConnect)
        	this.connect();
    },
    
    /**
     * @method
     * Connect to the Redis instance. Supports authentication if a #password is provided.
     */
    connect: function(){  	
    	var me = this;

		this.onConnect();

		if (this.client.hasOwnProperty('placeholder')) {
			this.client = redis.createClient(this.port,this.host);
		}
		
		this.client.on('error',function(e){
    		me.fireError(e);
    	});
    	
    	this.client.on('end',function(){
    		me.onDisconnect();
    	});
    	
    	// Authenticate/authorize if a password is provided. 
    	if ( this.password !== null ) {
    		this.onAuthorization();
    		this.client.auth(this.password,function(){
    			me.onAuthorized();
    			me.securedConnection = true;
    			if (me.database !== 1)
	    			me.changeDatabase(me.database);
	    		me.testConnection();
            });
       	} else if (this.database !== 1) {
    		this.changeDatabase(this.database);
			this.testConnection();
		} else
			this.testConnection();
		
    },
    
    /**
     * @method
     * Make sure the connection is active. This fires the #connected event on success.
     * @private
     */
    testConnection: function(){
    	var me = this;
    	//TODO: Set a timeout and monitor it.
    	this.client.get('__ngn_test_connect__',function(e,v){
			if (!e) {
				me.onConnected();
				me.onReady();
			}
		});
    },
	
	/**
	 * @method
	 * Change which database in the Redis instance the connection should use.
	 * @param {Number} index
	 * The index of the database to connect to. The default Redis configuration
	 * supports 16 databases, meaning any integer from 1-16 would be acceptable.
	 * Acceptable values are dependent on the Redis server configuration.
	 */
	changeDatabase: function(index){
		this.database = index;
		this.client.select(index);
	},
	
	/**
	 * @event ready
	 * Fired when the connection is ready for interaction with a client.
	 */
	onReady: function(){
		this.emit('ready');
	}
    
});

// Create a module out of this.
module.exports = Class;
