var Base = require('../NGN.core'),
	cons = require('consolidate'),
	fs 	 = require('fs');

/**
 * @class NGN.util.Template
 * A generic template class.
 * 
 * 		var tpl = new NGN.util.Template({
 * 			source: '/path/to/file.jade',
 * 			data:	{name:'John'},
 * 			autoRender: false
 * 		});
 * 		
 * 		tpl.on('render',function(){
 * 			console.log(tpl.output);
 * 		});
 * 		
 * 		tpl.render();
 * @extends NGN.core
 */
var Class = Base.extend({
	
	constructor: function(config){
		
		config = config || {};
		
		Class.super.constructor.call(this,config);
		
		Object.defineProperties(this,{
			
			/**
			 * @property {String}
			 * The template code.
			 * @private
			 */
			tpl: {
				value:		null,
				enumerable:	false,
				writable:	true
			},
			
			/**
			 * @cfg {String}
			 * The filepath of the template.
			 */
			source: {
				enumerable:	true,
				get:		function(){ return this.tpl; },
				set:		function(value){
								if (fs.existsSync(__NGN.path.resolve(value))) {
									this.tpl = value;
									if (this.renderer == null && __NGN.path.extname(__NGN.path.resolve(value)) !== null)
										this.renderer = __NGN.path.extname(__NGN.path.resolve(value)).replace(/\./,'');
								} else if (fs.existsSync(__NGN.path.join(__NGN.rootDir,value))) {
									this.tpl = __NGN.path.join(__NGN.rootDir,value);
									if (this.renderer == null && __NGN.path.extname(value) !== null)
										this.renderer = __NGN.path.extname(value).replace(/\./,'');
								} else if (fs.existsSync(__NGN.path.join(__dirname,value))) {
									this.tpl = __NGN.path.join(__dirname,value);
									if (this.renderer == null && __NGN.path.extname(value) !== null)
										this.renderer = __NGN.path.extname(value).replace(/\./,'');
								} else {
									this.onMissingFile();
								}
							}
			},
			
			/**
			 * @cfg {Object}
			 * A key/value object containing the data that replaces variables in the template #source.
			 */
			data: {
				value:		config.data || {},
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @property {Array} [engines=['dust','eco','ejs','haml','haml-coffee','handlebars','hogan','jade','jazz','jqtp','liquor','mustache','QEJS','swig','underscore','walrus','whiskers']]
			 * An array of all recognized renderers.
			 * @static
			 */
			engines: {
				value:		[
								'dust','eco','ejs',
								'haml','haml-coffee','handlebars',
								'hogan','jade','jazz','jqtp',
								'liquor','mustache','QEJS','swig',
								'underscore','walrus','whiskers'
							],
				enumerable:	true,
				writable:	false
			},
			
			/**
			 * @cfg {String} [renderer=null]
			 * The name of the renderer engine. If this is left empty, NGN will attempt to identify the
			 * appropriate engine by the filetype/file extension. If nothing can be found, `jade` is the
			 * fallback default. 
			 * 
			 * This can be any of the following:
			 * 
			 * - [dust](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/)
			 * - [eco](https://github.com/sstephenson/eco)
			 * - [ejs](https://github.com/visionmedia/ejs)
			 * - [haml](https://github.com/visionmedia/haml.js) [(website)](http://haml-lang.com/)
			 * - [haml-coffee](https://github.com/9elements/haml-coffee) [(website)](http://haml-lang.com/)
			 * - [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/)
			 * - [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
			 * - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)
			 * - [jazz](https://github.com/shinetech/jazz)
			 * - [jqtpl](https://github.com/kof/node-jqtpl) [(website)](http://api.jquery.com/category/plugins/templates/)
			 * - [liquor](https://github.com/chjj/liquor)
			 * - [mustache](https://github.com/janl/mustache.js)
			 * - [QEJS](https://github.com/jepso/QEJS)
			 * - [swig](https://github.com/paularmstrong/swig) [(website)](http://paularmstrong.github.com/swig/)
			 * - [underscore](https://github.com/documentcloud/underscore) [(website)](http://documentcloud.github.com/underscore/)
			 * - [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
			 * - [whiskers](https://github.com/gsf/whiskers.js/tree/)
			 * 
			 * _The engine you choose must be installed separately._
			 * 
			 * **Updates**
			 * 
			 * NGN uses [consolidate.js](https://raw.github.com/visionmedia/consolidate.js) for templating.
			 * More templating engines may be supported as that library is updated. 
			 */
			_renderer: {
				value:		config.renderer || null,
				enumerable:	false,
				writable:	true,
				configurable:true
			},
			
			renderer: {
				enumerable:	true,
				get:		function(){return this._renderer;},
				set:		function(value){
								if (this.engines.indexOf(value) >= 0 && this.renderer !== null)
									this.onUnrecognizedRenderer();
								this._renderer = value;
							}
			},
			
			/**
			 * @cfg {Boolean} [autoRender=true]
			 * Automatically #render the content when this object is created.
			 */
			autoRender: {
				value:		__NGN.coalesce(config.autoRender,false),
				enumerable:	true,
				writable:	true,
				configurable:true
			},
			
			/**
			 * @property {String} [output=null]
			 * The output of the #render operation.
			 * @readonly
			 */
			output: {
				value:		null,
				enumerable:	true,
				writable:	true,
				configurable:true
			}
			
		});
			
		if (config.source)
			this.source = config.source;
		
		if (this.renderer == null )
			this._renderer = 'jade';
			
		if (this.autoRender)
			this.render();
		
	},
	
	/**
	 * @method
	 * Render the template. Fires #rendered when complete.
	 * @param {Function} [callback]
	 * Executed on completion. Receives a single argument with the generated output.
	 */
	render: function(callback){
		var me = this;
		cons[this.renderer](this.tpl,this.data,function(err,out){
			if(err)
				me.fireError(err);
			me.output = out;
			me.onRendered();
			if (callback)
				callback(out);
		});
	},
	
	/**
	 * @event unrecognizedrenderer
	 * Fired when the #renderer is not recognized.
	 */
	onUnrecognizedRenderer: function(){
		this.emit('unrecognizedrenderer');
		console.log(
			'WARNING:'.yellow+' '
			+this.renderer.toString().yellow.bold
			+' is not a recognized template renderer.'
		);
	},
	
	/**
	 * @event missing
	 * Fired when the template file cannot be found.
	 * @param {Object} file
	 */
	onMissingFile: function(file){
		this.emit('missing',file||this.tpl);
	},
	
	/**
	 * @event rendered
	 * Fired when the content is rendered. Passes an argument with the generated #output.
	 */
	onRendered: function() {
		this.emit('rendered',this.output);
	}
	
});

module.exports = Class;
