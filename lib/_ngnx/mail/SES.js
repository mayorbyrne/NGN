var Base = require('./Common');

/**
 * @class NGNX.mail.SES
 * Send messages using a SES server. This is a convenience wrapper around NGNX.mail.Common
 * @extends NGNX.mail.Common
 */
var Class = Base.extend({
	
	/**
	 * @constructor
	 * Create a new SES server connection
	 * @param {Object} config
	 */
	constructor: function(config){
		
		config = config || {};
		config.service = 'SES ';

		Class.super.constructor.call(this,config);
		
		/**
		 * @cfg {String} username
		 * The username of the account to connect with.
		 */
		
		/**
		 * @cfg {String} password
		 * The password of the account to connect with.
		 */
	}
	
});

module.exports = Class;
