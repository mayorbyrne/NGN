Ext.data.JsonP.NGN_app_Application({"component":false,"html_meta":{"aside":["            <div class='aside guide'>\n              <h4>Guide</h4>\n              <p><a href='#!/guide/application_scope'><img src='guides/application_scope/icon.png' alt=''> Application Scope</a></p>\n            </div>\n"]},"tagname":"class","extends":null,"alternateClassNames":[],"inheritdoc":null,"mixedInto":[],"singleton":true,"uses":[],"statics":{"css_mixin":[],"cfg":[],"method":[],"property":[],"event":[],"css_var":[]},"parentMixins":[],"mixins":[],"code_type":"assignment","inheritable":false,"meta":{"aside":[{"type":"guide","name":"application_scope"}]},"members":{"css_mixin":[],"cfg":[{"tagname":"cfg","owner":"NGN.app.Application","meta":{},"name":"administrator","id":"cfg-administrator"},{"tagname":"cfg","owner":"NGN.app.Application","meta":{},"name":"name","id":"cfg-name"}],"method":[{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"clear","id":"method-clear"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"get","id":"method-get"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"getServer","id":"method-getServer"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"getServersByType","id":"method-getServersByType"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"load","id":"method-load"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"set","id":"method-set"},{"tagname":"method","owner":"NGN.app.Application","meta":{},"name":"toJson","id":"method-toJson"}],"event":[{"tagname":"event","owner":"NGN.app.Application","meta":{},"name":"applicationend","id":"event-applicationend"},{"tagname":"event","owner":"NGN.app.Application","meta":{},"name":"applicationstart","id":"event-applicationstart"}],"property":[],"css_var":[]},"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Application.html#NGN-app-Application' target='_blank'>Application.js</a></div></pre><div class='doc-contents'>            <div class='aside guide'>\n              <h4>Guide</h4>\n              <p><a href='#!/guide/application_scope'><img src='guides/application_scope/icon.png' alt=''> Application Scope</a></p>\n            </div>\n<p>Creating an application enables the globally accessible <code>application</code> variable,\nwhich is designed to store custom application logic. This class registers the\napplication, loads defaults, and provides several convenience methods\nThe application scope is a globally accessible variable designed to store custom\napplication logic.</p>\n\n<p><strong>Example</strong></p>\n\n<pre><code>    var app = new <a href=\"#!/api/NGN.app.Application\" rel=\"NGN.app.Application\" class=\"docClass\">NGN.app.Application</a>({\n                name: 'myApp'\n            });\n</code></pre>\n\n<p>This basic example will create an NGN app and enable the global <code>application</code> scope. This allows\nother files in the project to reference it easily:</p>\n\n<pre><code>    console.log(application.name); // --&gt; myApp\n</code></pre>\n\n<p>There is also a shortcut method available (NGN#app). Using this method, the following example would work:</p>\n\n<pre><code>    NGN.app({name:'myApp'});\n\n    console.log(application.name); // --&gt; myApp\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-administrator' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-cfg-administrator' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-cfg-administrator' class='name expandable'>administrator</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'>This can be almost anything. ...</div><div class='long'><p>This can be almost anything. If an object is provided with\nan <code>email</code> element, it will be used to send administrative\nnotices (if a mail server is available).</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='cfg-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-cfg-name' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-cfg-name' class='name expandable'>name</a><span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'>The name of the application ...</div><div class='long'><p>The name of the application</p>\n<p>Defaults to: <code>NGN_Application</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-clear' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-clear' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-clear' class='name expandable'>clear</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Resets the application scope to it's original default (blank) . ...</div><div class='long'><p>Resets the application scope to it's original default (blank) .</p>\n</div></div></div><div id='method-get' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-get' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-get' class='name expandable'>get</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> property</span> ) : Mixed</div><div class='description'><div class='short'>Get a single property. ...</div><div class='long'><p>Get a single property. Supports nested properties, such as <code>get('my.nested.attribute')</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>property</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name of the application element to return.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getServer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getServer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getServer' class='name expandable'>getServer</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Get a server instance by it's registered name. ...</div><div class='long'><p>Get a server instance by it's registered name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getServersByType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getServersByType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getServersByType' class='name expandable'>getServersByType</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> type</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Get servers by a specific type. ...</div><div class='long'><p>Get servers by a specific type. This returns an object with each attribute of the\nobject being the name of a server and each value being a reference to the server object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-load' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-load' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-load' class='name expandable'>load</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> config</span> )</div><div class='description'><div class='short'>This method accepts a key/value object or an absolute path to a JSON file. ...</div><div class='long'><p>This method accepts a key/value object or an absolute path to a JSON file.\n<strong>Object</strong></p>\n\n<pre><code> var obj = {\n     title:      'Awesome App',\n            author:     'Acme, Inc.',\n            keywords:   'Awesome, App'\n }\n\n application.load(obj);\n</code></pre>\n\n<p><strong>Filepath</strong></p>\n\n<pre><code> application.load(__dirname + '/application.json');\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>JSON Object or Filepath.</p>\n</div></li></ul></div></div></div><div id='method-set' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-set' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-set' class='name expandable'>set</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> property, Any value</span> )</div><div class='description'><div class='short'>Set a property in the application scope. ...</div><div class='long'><p>Set a property in the application scope.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>property</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>value</span> : Any<div class='sub-desc'><p>This may be a string, date, or any valid JavaScript object.</p>\n</div></li></ul></div></div></div><div id='method-toJson' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-toJson' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-toJson' class='name expandable'>toJson</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> obj</span> )</div><div class='description'><div class='short'>Return the application as a JSON object. ...</div><div class='long'><p>Return the application as a JSON object. This strips the functions and only returns simple data types.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-applicationend' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-applicationend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-applicationend' class='name expandable'>applicationend</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when the application ends. ...</div><div class='long'><p>Fired when the application ends.</p>\n</div></div></div><div id='event-applicationstart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-applicationstart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-applicationstart' class='name expandable'>applicationstart</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when the NGN application starts. ...</div><div class='long'><p>Fired when the NGN application starts.</p>\n</div></div></div></div></div></div></div>","name":"NGN.app.Application","aliases":{},"superclasses":[],"requires":[],"id":"class-NGN.app.Application","subclasses":[],"files":[{"href":"Application.html#NGN-app-Application","filename":"Application.js"}]});