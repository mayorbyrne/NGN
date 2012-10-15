var Base = require('../../../lib/web/API');

/**
 * @class NGNX.web.ProxyController
 * Provides a REST wrapper around a NGN.web.Proxy, allowing live updates.
 * 
 * Please see the guide for the REST endpoint documentation.
 * 
 * @aside proxycontroller
 * @extends NGN.web.API
 * @author Corey Butler
 */
var Class = Base.extend({

	/**
	 * @constructor
	 * Create a new proxy controller.
	 */
    constructor: function(config) {

		config = config || {};
		
		var start = __NGN.coalesce(config.autoStart,true), me = this;
		
		config.autoStart = false;
		config.processors = new NGNX.web.ApiRequestHelper();
		
		/**
		 * @cfg {Number} [port=8181]
		 * The port on which the controller server should listen.
		 */
		config.port = config.port || 3000;
		
        // Inherit from NGN.core
        Class.super.constructor.call(this,config);

        Object.defineProperties(this,{
            
            /**
             * @cfg {NGN.web.Proxy} proxy (required)
             * The proxy to be controlled.
             */
            _proxy: {
            	value:		config.proxy,
            	enumerable:	true,
            	writable:	true
            }

        });
        
        this.routes = this.getRoutes();

		this._proxy.on('change',function(c){
			me._proxy.cache();
		})

      	if (start)
        	this.start();

    },
        
    /**
     * @method
     * Get the routes. This is a hard-coded object split into a function for code readability only.
     * @private
     */
    getRoutes: function() {
    	var p = this._proxy;
    	var proxy = {
			host: {
		
				/**
				 * Create a virtual host
				 */
				post: function(req,res){
					
					if (req.form.hostname == undefined) {
						res.send(400,'Missing attribute: hostname');
						return;
					}
					
					if (req.form.target == undefined) {
						res.send(400,'Missing attribute: target');
						return;
					}
					
					// Default port
					req.form.port = req.form.port || 80;
		
					if (typeof req.form.port !== 'number') {
						res.send(400,'Invalid port number: '+req.form.port);
						return;
					}
					
					// Add the hostname
					try {
						p.createVirtualHost({
							hostname: 	req.form.hostname,
							port:		req.form.port,
							target:		req.form.target,
							alias:		req.form.alias || []
						});
						
						// Add rules
						if (req.form.rules){
							for (var method in req.form.rules){
								if (req.form.rules.hasOwnProperty(method)){
									var rl = req.form.rules[method];
									for (var i=0;i<rl.length;i++){
										for (var pattern in rl[i]){
											p.getVirtualHost(req.form.hostname,req.form.port).addRewriteRule(method,pattern,rl[i][pattern]);
										}
									}
								}
							}
						}
						
						res.send(201);
					} catch (e) {
						res.send(500,e);
					}
				},
				
				del: function(req,res){
					try {
						if (p.vhost[req.qs.port][req.qs.server] == undefined)
							res.send(404,'No virtual host by this address.');
						else {
							p.removeVirtualHost(req.qs.server,req.qs.port);
							res.send(200);
						}
					} catch(e) {
						res.send(500,e)
					}
				},
				
				get: function(req,res){
					if (p.vhost[req.qs.port][req.qs.server] == undefined)
						res.send(404,'No virtual host by this address.');
					else
						res.json(p.vhost[req.qs.port][req.qs.server].getConfiguration());
				},
				
				aliases: {
					get: function(req,res){
							if (p.vhost[req.qs.port][req.qs.server] == undefined)
								res.send(404,'No virtual host by this address.');
							else
								res.send(p.vhost[req.qs.port][req.qs.server].alias);
						}
				},
				
				destination: {
					post: function(req,res){
						if (p.vhost[req.qs.port][req.qs.hostname] == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						} else if (p.vhost[req.qs.port][req.qs.hostname].target.indexOf(req.qs.server+':'+req.qs.serverport.toString()) >= 0) {
							res.send(205);
							return;
						} else
							p.vhost[req.qs.port][req.qs.hostname].addTarget(req.qs.server+':'+req.qs.serverport.toString());
						res.send(201);
					},
					
					del: function(req,res){
						if (p.vhost[req.qs.port][req.qs.hostname] == undefined) {
							res.send(404,'No virtual host by this address.');
							return;
						} else
							p.vhost[req.qs.port][req.qs.hostname].removeTarget(req.qs.server+':'+req.qs.serverport.toString());
						res.send(200);
					}
				},
				
				destinations: {
					get: function(req,res){
						if (p.vhost[req.qs.port][req.qs.server] == undefined)
							res.send(404,'No virtual host by this address.');
						else
							res.json(p.vhost[req.qs.port][req.qs.server].target);
					}
				},
				
				rule: {
					post: function(req,res){
						var vh = p.vhost[req.qs.port][req.qs.server];
						if (vh == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						}
						
						var mthd = req.qs.method || 'ALL';
						delete req.body.method;
			
						var pat = Object.keys(req.body),
							sub = req.body[pat];
						
						if (pat == undefined || sub == undefined) {
							res.send(400,'Missing attribute: pattern and/or substitute');
							return;
						}
						
						vh.addRewriteRule(mthd.toUpperCase(),pat,sub,__NGN.coalesce(req.form.last,false),req.form.position||null);

						res.send(201);
					},
					
					del: function(req,res){
						
						var vh = p.vhost[req.qs.port][req.qs.server];
						if (vh == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						}
						
						if (req.qs.method == undefined || req.qs.index == undefined) {
							res.send(400,'Missing attribute: method and/or index');
							return;
						}
						
						vh.removeRewriteRuleAt(req.qs.method.toUpperCase(),req.qs.index);

						res.send(200);
						
					},
					
					get: function(req,res){
						var vh = p.vhost[req.qs.port][req.qs.server];
						if (vh == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						}
						
						res.json(vh.rules[re.qs.method.toUpperCase()][req.qs.index]);
					}
				},
				
				rules: {
					get: function(req,res){
						if (p.vhost[req.qs.port][req.qs.server] == undefined)
							res.send(404,'No virtual host by this address.');
						else
							res.json(p.vhost[req.qs.port][req.qs.server].getConfiguration().rules);
					},
					
					del: function(req,res){
						var vh = p.vhost[req.qs.port][req.qs.server];
						if (vh == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						}
					
						vh.rules = {};
						res.send(200);
					},
					
					post: function(req,res){
						var vh = p.vhost[req.qs.port][req.qs.server];
						if (vh == undefined){
							res.send(404,'No virtual host by this address.');
							return;
						}
						
						vh.rules = req.form;
						
						res.send(201);
					}
				}
			},
			
			hosts: {
				get: function(req,res){
					res.json(p.getVirtualHosts());
				}
			},
			
			alias: {
				post: function(req,res){
					if (p.vhost[req.qs.originport][req.qs.origin] == undefined){
						res.send(404,'No virtual host by this address.');
						return;
					} else if (p.vhost[req.qs.originport][req.qs.origin].alias.indexOf(req.qs.alias) >= 0) {
						res.send(205);
						return;
					} else
						p.vhost[req.qs.originport][req.qs.origin].addAlias(req.qs.alias);
					res.send(201);
				},
				del: function(req,res){
					if (p.vhost[req.qs.originport][req.qs.origin] == undefined){
						res.send(404,'No virtual host by this address.');
						return;
					}
					try {
						p.vhost[req.qs.originport][req.qs.origin].removeAlias(req.qs.alias);
						res.send(200);
					} catch(e) {
						res.send(500,e);
					}
				}
			}
			
		};
		
		return {
			'/proxy': {
				'/from/:hostname/:port/to/:server/:serverport': {
					post: proxy.host.destination.post,
					del: proxy.host.destination.del
				},
				
				'/alias': {
					'/:alias/of/:origin/:originport': {
						post: 	proxy.alias.post,
						del:	proxy.alias.del
					}
				},
				
				'/host': {
				
					'/:server/:port': {
						get: proxy.host.get,
						del: proxy.host.del,
				
						'/targets': {
							get: proxy.host.destinations.get
						},
						
						'/aliases': {
							get: proxy.host.aliases.get
						},
				
						'/rules': {
							del: proxy.host.rules.del,
							get: proxy.host.rules.get
						},
						'/rule': {
							'/:method': {
								'/:index':{
									del: proxy.host.rule.del,
									get: proxy.host.rule.get
								},
								post: proxy.host.rule.post
							}
						}
					},
					post: proxy.host.post
				},
				
				'/hosts':{
					get: proxy.hosts.get
				}
			}
			
		};
    }

});

module.exports = Class;