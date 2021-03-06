var Base = require('./Common');

/**
 * @class NGNX.mail.Sendgrid
 * Send messages using a Sendgrid server. This is a convenience wrapper around NGNX.mail.Common
 * @extends NGNX.mail.Common
 */
var Class = Base.extend({
	
	/**
	 * @constructor
	 * Create a new Sendgrid server connection
	 * @param {Object} config
	 */
	constructor: function(config){
		
		config = config || {};
		config.service = 'Sendgrid';

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
