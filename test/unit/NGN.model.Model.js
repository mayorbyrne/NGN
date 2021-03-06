/**
 * Make sure the NGN global namespace is available.
 */
var should = require('should');
describe('NGN.model.Model', function(){
	
	var yes = true;
	var m  = new __NGN.model.Model();
	var m2 = new __NGN.model.Model();
	var m3 = new __NGN.model.Model();
	var m4 = new __NGN.model.Model();
	var m5 = new __NGN.model.Model();
	var m6 = new __NGN.model.Model();
	
	function regexSame(r1, r2) {
	    if (r1 instanceof RegExp && r2 instanceof RegExp) {
	        var props = ["global", "multiline", "ignoreCase", "source"];
	        for (var i = 0; i < props.length; i++) {
	            var prop = props[i];
	            if (r1[prop] !== r2[prop]) {
	                return(false);
	            }
	        }
	        return(true);
	    }
	    return(false);
	}
	
	it('Create Model', function(done){
	  	should.exist(m);
	  	done();
	});
	
	it('STRING: Create, update, and delete data property',function(done){
		
		m.on('change',function(d){
			if (d.type == 'create'){
				d.property.should.equal('test');
				d.value.should.equal('testvalue');
			} else if (d.type == 'update') {
				d.property.should.equal('test');
				d.value.should.equal('testvalue2');
				delete m.test;
			} else {
				d.property.should.equal('test');
				done();
			}
		});
		
		// Test String
		m.test = 'testvalue';
		//yes.should.equal(m.test instanceof String);
		m.test = 'testvalue2';
		
	});
	
	it('ARRAY: Create, update, and delete data property',function(done){
		
		m2.on('change',function(d){
			if (d.type == 'create'){
				d.property.should.equal('test');
				d.value.length.should.equal(0);
			} else if (d.type == 'update') {
				d.property.should.equal('test');
				if (d.array.action == 'add'){
					m2.test[d.array.index].should.equal(d.array.value);
				} else if (d.array.action == 'delete'){
					m2.test.length.should.equal(1);
					delete m2.test;
				}
			} else {
				d.property.should.equal('test');
				done();
			}
		});
		
		// Test Array
		m2.test = [];
		yes.should.equal(m2.test instanceof Array);
		m2.test.push('a');
		m2.test[1] = 'b';
		m2.test.pop();
		
	});
	
	it('NUMBER: Create, update, and delete data property',function(done){
		
		m3.on('change',function(d){
			if (d.type == 'create'){
				d.property.should.equal('test');
				d.value.should.equal(1);
			} else if (d.type == 'update') {
				d.property.should.equal('test');
				d.value.should.equal(2);
				delete m3.test;
			} else {
				d.property.should.equal('test');
				done();
			}
		});
		
		// Test String
		m3.test = 1;
		//yes.should.equal(m3.test instanceof Number);
		m3.test += 1;
		
	});
	
	it('DATE: Create, update, and delete data property',function(done){
		
		var tmp = new Date(2000,1,1);
		m4.test = tmp;
		console.log('\nIgnore warning (expected behavior due to direct proxy implementation in V8).'.cyan)
		yes.should.equal(m4.test instanceof Date);
		yes.should.equal(m4.test.toJSON() == tmp.toJSON());
		
		var x = m4.test;
		x.setFullYear(1999);
		m4.test = x;
		
		yes.should.equal(m4.test.toJSON() == new Date(1999,1,1).toJSON());
		
		delete m4.test;
		
		yes.should.equal(m4.test == undefined);
		
		var cl = m4.getChangeLog();
		
		cl.length.should.equal(3);
		
		cl[0].property.should.equal('test');
		cl[1].property.should.equal('test');
		cl[2].property.should.equal('test');
		
		cl[0].type.should.equal('create');
		cl[1].type.should.equal('update');
		cl[2].type.should.equal('delete');
		
		cl[0].value.toJSON().should.equal(tmp.toJSON());
		cl[1].oldValue.toJSON().should.equal(tmp.toJSON());
		cl[1].value.toJSON().should.equal(new Date(1999,1,1).toJSON());
		cl[2].oldValue.toJSON().should.equal(new Date(1999,1,1).toJSON());
		
		m4.rollback();
		
		yes.should.equal(m4.test !== undefined);
		
		m4.getChangeLog().length.should.equal(2);
		
		done();
	});
	
	it('BOOLEAN: Create, update, and delete data property',function(done){
		
		m6.on('change',function(d){
			if (d.type == 'create'){
				d.property.should.equal('test');
				d.value.should.equal(true);
			} else if (d.type == 'update') {
				d.property.should.equal('test');
				d.value.should.equal(false);
			} else {
				d.property.should.equal('test');
				done();
			}
		});
		
		// Test Boolean
		m6.test = true;
		true.should.equal(typeof m6.test === 'boolean');
		true.should.equal(m6.test);
		m6.test = false;
		delete m6.test;
		
	});
	
	it('REGEX: Create, update, and delete data property',function(done){
		
		m5.on('change',function(d){
			if (d.type == 'create'){
				d.property.should.equal('test');
				yes.should.equal(regexSame(d.value,/ab/gi));
			} else if (d.type == 'update') {
				d.property.should.equal('test');
				yes.should.equal(regexSame(d.value,/(a|b)/gi));
			} else {
				d.property.should.equal('test');
				done();
			}
		});
	
		// Test String
		m5.test = /ab/gi;
		yes.should.equal(m5.test instanceof RegExp);
		//m5.test = /(a|b)/gi;
		//delete m5.test;
		done();
	});
	
});