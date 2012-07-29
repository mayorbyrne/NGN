Ext.data.JsonP.application_scope({"guide":"<h1>Application Scope</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/application_scope-section-1'>Aren't Node.js Globals Bad Practice?</a></li>\n<li><a href='#!/guide/application_scope-section-2'>Using the Application Scope</a></li>\n</ol>\n</div>\n\n<p>NGN creates an empty reference called application, which is stored in the <a href=\"http://nodejs.org/api/globals.html#globals_global\">node.js global namespace</a>.</p>\n\n<h2 id='application_scope-section-1'>Aren't Node.js Globals Bad Practice?</h2>\n\n<p>There are arguments on both sides as to whether or not using global namespaces is a good idea. On one side, globals provide a simple way\nof keeping application logic <a href=\"http://en.wikipedia.org/wiki/Don't_repeat_yourself\">DRY</a>. Accessing globals becomes very simple, and avoids\na lot of scope conflicts when dealing with high level objects.</p>\n\n<p>On the other hand, using globals can cause <a href=\"http://blog.nodejs.org/2012/02/27/managing-node-js-dependencies-with-shrinkwrap/\">dependency problems</a>.\nIf a module depends on a global variable that is already taken, or if the global variable is not available (part of another package/module), then\nmodules can fail.</p>\n\n<h3>Why NGN Globals Are Good: NGN Application Philosophy</h3>\n\n<p>NGN is designed to simplify construction of applications. Applications <em>are</em> the product, whereas modules are typically a functional piece <em>of</em> a product.\nApplications are the last leg of development before users start using them. In most cases, if an application needs to be expanded, it will be further\ndeveloped, not treated as a module. If an application is going to be treated like a module, then the NGN framework isn't necessarily the best fit.</p>\n\n<h2 id='application_scope-section-2'>Using the Application Scope</h2>\n\n<p>Using the <code>application</code> scope is quite simple. As long as the main/executable node.js file includes NGN, i.e. <code>require('ngn')</code>, <code>applicaton</code> will be\navailable. The scope is intended to be used as a key/value structure.</p>\n\n<p><strong>Example</strong></p>\n\n<pre><code>require('ngn');\n\napplication.name    = 'My Awesome App';\napplication.started = new Date();\napplication.defaults= {\n                        title:      'Awesome App',\n                        author:     'Acme, Inc.',\n                        keywords:   'Awesome, App'\n                    };\n</code></pre>\n\n<p>The <code>application</code> scope contains a method called Application#load, which applies a key/value object to the application scope.\nAn object or absolute file path can be passed as an argument to this method as a means of applying multiple attributes at once.</p>\n\n<p>For example:</p>\n\n<p><strong>Object Approach</strong></p>\n\n<pre><code> var obj = {\n    title:      'Awesome App',\n    author:     'Acme, Inc.',\n    keywords:   'Awesome, App'\n }\n\n application.load(obj);\n</code></pre>\n\n<p>This approach is useful if application scope is contained in a remote or local database, REST service, or any other dynamic JSON provider.</p>\n\n<p><strong>Filepath Approach</strong></p>\n\n<pre><code> application.load(__dirname + '/application.json');\n</code></pre>\n\n<p>This method is useful when you have a lot of predefined application properties in a static JSON file.</p>\n\n<p>Remember that NGN has several powerful features, methods, and attributes of it's own (see <a href=\"#!/guide/global_features\">NGN Namespace Guide</a>). The <code>application</code>\nscope could but shouldn't duplicate the built-in functionality of NGN. Many applications won't need the <code>application</code> scope at all, but it\nis available for those that do.</p>\n","title":"Application Scope"});