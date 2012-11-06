module.exports = {
	'/test': {
		'/more': {
			get: function(req,res){
			res.write(req.url.toString());
			res.write('\nTesting more nested routes');
			res.end();
			}
		},

	'/redirect':{
			get: function(req,res){
			res.redirect('http://www.google.com');
			}
	},

		get: function(req,res){
		res.write('Basic Test');
		res.end();
		}
	},
	
	'/[a-zA-Z0-9]': {
		get: function(req,res){
		res.end('Yo!');
		}
	},

	'/': {
		get: function(req,res){
		res.end('Hello. I am root.');
		}
	}
}