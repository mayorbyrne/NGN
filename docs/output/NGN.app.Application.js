Ext.data.JsonP.NGN_app_Application({"subclasses":[],"meta":{"aside":[{"type":"guide","name":"application_scope"}]},"linenr":3,"inheritdoc":null,"enum":null,"uses":[],"aliases":{},"requires":[],"component":false,"inheritable":null,"override":null,"extends":null,"mixedInto":[],"alternateClassNames":[],"members":{"css_mixin":[],"method":[{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"createDatasource","id":"method-createDatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"createService","id":"method-createService"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"fireError","id":"method-fireError"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"fireEvent","id":"method-fireEvent"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getDSN","id":"method-getDSN"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getDatasource","id":"method-getDatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getServer","id":"method-getServer"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getServersByType","id":"method-getServersByType"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getService","id":"method-getService"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"getServices","id":"method-getServices"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"registerServer","id":"method-registerServer"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"removeDSN","id":"method-removeDSN"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"removeDatasource","id":"method-removeDatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"removeService","id":"method-removeService"},{"meta":{},"owner":"NGN.app.Application","tagname":"method","name":"unregisterServer","id":"method-unregisterServer"}],"cfg":[{"meta":{},"owner":"NGN.app.Application","tagname":"cfg","name":"administrator","id":"cfg-administrator"},{"meta":{},"owner":"NGN.app.Application","tagname":"cfg","name":"name","id":"cfg-name"},{"meta":{},"owner":"NGN.app.Application","tagname":"cfg","name":"setCRUD","id":"cfg-setCRUD"}],"property":[{"meta":{"readonly":true,"protected":true},"owner":"NGN.app.Application","tagname":"property","name":"BUS","id":"property-BUS"},{"meta":{"protected":true},"owner":"NGN.app.Application","tagname":"property","name":"CRUD","id":"property-CRUD"},{"meta":{"protected":true},"owner":"NGN.app.Application","tagname":"property","name":"DSN","id":"property-DSN"},{"meta":{"protected":true},"owner":"NGN.app.Application","tagname":"property","name":"SERVER","id":"property-SERVER"}],"css_var":[],"event":[{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"applicationend","id":"event-applicationend"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"applicationstart","id":"event-applicationstart"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"beforecreatedatasource","id":"event-beforecreatedatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"beforeremovedatasource","id":"event-beforeremovedatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"createdatasource","id":"event-createdatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"ready","id":"event-ready"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"registerserver","id":"event-registerserver"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"removedatasource","id":"event-removedatasource"},{"meta":{},"owner":"NGN.app.Application","tagname":"event","name":"unregisterserver","id":"event-unregisterserver"}]},"superclasses":[],"private":null,"singleton":true,"tagname":"class","statics":{"css_mixin":[],"cfg":[],"method":[],"property":[],"css_var":[],"event":[]},"parentMixins":[],"name":"NGN.app.Application","html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Application.html#NGN-app-Application' target='_blank'>Application.js</a></div></pre><div class='doc-contents'><p>Creating an application enables the globally accessible <code>application</code> variable,\nwhich is designed to store custom application logic. This class registers the\napplication, loads defaults, and provides several convenience methods\nThe application scope is a globally accessible variable designed to store custom\napplication logic.</p>\n\n<p><strong>Example</strong></p>\n\n<pre><code>    var app = new <a href=\"#!/api/NGN.app.Application\" rel=\"NGN.app.Application\" class=\"docClass\">NGN.app.Application</a>({\n                name: 'myApp'\n            });\n</code></pre>\n\n<p>This basic example will create an NGN app and enable the global <code>application</code> scope. This allows\nother files in the project to reference it easily:</p>\n\n<pre><code>    console.log(application.name); // --&gt; myApp\n</code></pre>\n\n<p>There is also a shortcut method available (NGN#app). Using this method, the following example would work:</p>\n\n<pre><code>    NGN.app({name:'myApp'});\n\n    console.log(application.name); // --&gt; myApp\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-administrator' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-cfg-administrator' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-cfg-administrator' class='name expandable'>administrator</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'>This can be almost anything. ...</div><div class='long'><p>This can be almost anything. If an object is provided with\nan <code>email</code> element, it will be used to send administrative\nnotices (if a mail server is available).</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='cfg-name' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-cfg-name' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-cfg-name' class='name expandable'>name</a><span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span></div><div class='description'><div class='short'>The name of the application ...</div><div class='long'><p>The name of the application</p>\n<p>Defaults to: <code>NGN_Application</code></p></div></div></div><div id='cfg-setCRUD' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-cfg-setCRUD' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-cfg-setCRUD' class='name expandable'>setCRUD</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span></div><div class='description'><div class='short'>Specify the default NGN.CRUD object(s) used by any Model objects. ...</div><div class='long'><p>Specify the default NGN.CRUD object(s) used by any Model objects.\nCRUD operations can be specified for a specific model(s) or all models.</p>\n\n<p><strong>Example</strong></p>\n\n<pre><code>    NGNA.CRUD(new NGNX.datasource.CRUD.MongoDB('myAppDatasource'));\n</code></pre>\n\n<p>or</p>\n\n<pre><code>    NGNA.CRUD({\n        'default':  new NGNX.datasource.CRUD.MongoDB('myMongoGenericDatasource'),\n        Person:     new NGNX.datasource.CRUD.MongoDB('myMongoUserDatasource')\n});\n</code></pre>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-BUS' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-property-BUS' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-property-BUS' class='name expandable'>BUS</a><span> : EventEmitter</span><strong class='protected signature' >protected</strong><strong class='readonly signature' >readonly</strong></div><div class='description'><div class='short'>The application event bus. ...</div><div class='long'><p>The application event bus. This traffics all events\nof the application.</p>\n</div></div></div><div id='property-CRUD' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-property-CRUD' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-property-CRUD' class='name expandable'>CRUD</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='protected signature' >protected</strong></div><div class='description'><div class='short'>Map MODEL objects to a persistence/storage object (NGN.core.CRUD). ...</div><div class='long'><p>Map MODEL objects to a persistence/storage object (NGN.core.CRUD).</p>\n<p>Defaults to: <code>{value: {}, enumerable: true, writable: true}</code></p></div></div></div><div id='property-DSN' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-property-DSN' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-property-DSN' class='name expandable'>DSN</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='protected signature' >protected</strong></div><div class='description'><div class='short'>Store data service names associated with the application. ...</div><div class='long'><p>Store <strong>data service names</strong> associated with the application.\nEach DSN key represents a database connection.</p>\n\n<pre><code>    var userDB = NGN.app.getDatasource('users');\n</code></pre>\n\n<p><em>OR</em></p>\n\n<pre><code>    var userDB = NGN.app.DSN['users'];\n</code></pre>\n<p>Defaults to: <code>Object</code></p></div></div></div><div id='property-SERVER' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-property-SERVER' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-property-SERVER' class='name expandable'>SERVER</a><span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><strong class='protected signature' >protected</strong></div><div class='description'><div class='short'>Stores servers used in the application. ...</div><div class='long'><p>Stores servers used in the application.</p>\n<p>Defaults to: <code>Object</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-createDatasource' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-createDatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-createDatasource' class='name expandable'>createDatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a> connection</span> )</div><div class='description'><div class='short'>Create and register a DSN. ...</div><div class='long'><p>Create and register a <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name by which the <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a> is referenced.</p>\n</div></li><li><span class='pre'>connection</span> : <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a><div class='sub-desc'><p>A connection to a specific database or data store.</p>\n</div></li></ul></div></div></div><div id='method-createService' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-createService' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-createService' class='name expandable'>createService</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, NGN.service.Connection connection</span> )</div><div class='description'><div class='short'>Create and register a #SSN. ...</div><div class='long'><p>Create and register a #SSN.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The name by which the #SSN is referenced.</p>\n</div></li><li><span class='pre'>connection</span> : NGN.service.Connection<div class='sub-desc'><p>A connection to a specific service or module.</p>\n</div></li></ul></div></div></div><div id='method-fireError' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-fireError' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-fireError' class='name expandable'>fireError</a>( <span class='pre'>[<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> metadata]</span> )</div><div class='description'><div class='short'>Fires the specified error. ...</div><div class='long'><p>Fires the specified error.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>metadata</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-fireEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-fireEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-fireEvent' class='name expandable'>fireEvent</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> eventName, [<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> metadata]</span> )</div><div class='description'><div class='short'>Fires the specified event. ...</div><div class='long'><p>Fires the specified event. Unlike #emit, this event is bubbled to the NGN#BUS.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>eventName</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li><li><span class='pre'>metadata</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDSN' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getDSN' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getDSN' class='name expandable'>getDSN</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Shortcut. ...</div><div class='long'><p>Shortcut. Equivalent to <a href=\"#!/api/NGN.app.Application-method-getDatasource\" rel=\"NGN.app.Application-method-getDatasource\" class=\"docClass\">getDatasource</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a> to return.</p>\n</div></li></ul></div></div></div><div id='method-getDatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getDatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getDatasource' class='name expandable'>getDatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Returns the specified datasource connection. ...</div><div class='long'><p>Returns the specified datasource connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a> to return.</p>\n</div></li></ul></div></div></div><div id='method-getServer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getServer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getServer' class='name expandable'>getServer</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> id</span> )</div><div class='description'><div class='short'>Get a specific server instance by name. ...</div><div class='long'><p>Get a specific server instance by name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>id</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getServersByType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getServersByType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getServersByType' class='name expandable'>getServersByType</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> type</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></div><div class='description'><div class='short'>Get servers by a specific type. ...</div><div class='long'><p>Get servers by a specific type. This returns an object with each attribute of the\nobject being the name of a server and each value being a reference to the server object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getService' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getService' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getService' class='name expandable'>getService</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Returns the specified service source connection. ...</div><div class='long'><p>Returns the specified service source connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the #SSN to return.</p>\n</div></li></ul></div></div></div><div id='method-getServices' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-getServices' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-getServices' class='name expandable'>getServices</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Returns the entire #SSN object. ...</div><div class='long'><p>Returns the entire #SSN object.</p>\n</div></div></div><div id='method-registerServer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-registerServer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-registerServer' class='name expandable'>registerServer</a>( <span class='pre'><a href=\"#!/api/NGN.core.Server\" rel=\"NGN.core.Server\" class=\"docClass\">NGN.core.Server</a> server</span> )</div><div class='description'><div class='short'>Register a server ...</div><div class='long'><p>Register a server</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>server</span> : <a href=\"#!/api/NGN.core.Server\" rel=\"NGN.core.Server\" class=\"docClass\">NGN.core.Server</a><div class='sub-desc'><p>The server instance</p>\n</div></li></ul></div></div></div><div id='method-removeDSN' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-removeDSN' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-removeDSN' class='name expandable'>removeDSN</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Shortcut. ...</div><div class='long'><p>Shortcut. Equivalent to <a href=\"#!/api/NGN.app.Application-method-removeDatasource\" rel=\"NGN.app.Application-method-removeDatasource\" class=\"docClass\">removeDatasource</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a> to remove.</p>\n</div></li></ul></div></div></div><div id='method-removeDatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-removeDatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-removeDatasource' class='name expandable'>removeDatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Removes a datasource connection. ...</div><div class='long'><p>Removes a datasource connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a> to remove.</p>\n</div></li></ul></div></div></div><div id='method-removeService' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-removeService' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-removeService' class='name expandable'>removeService</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>Removes a service or module connection. ...</div><div class='long'><p>Removes a service or module connection.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the #SSN to return.</p>\n</div></li></ul></div></div></div><div id='method-unregisterServer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-method-unregisterServer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-method-unregisterServer' class='name expandable'>unregisterServer</a>( <span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> name</span> )</div><div class='description'><div class='short'>Unregister a server. ...</div><div class='long'><p>Unregister a server. This will remove the instance from the application.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-event'>Events</h3><div class='subsection'><div id='event-applicationend' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-applicationend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-applicationend' class='name expandable'>applicationend</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when the application ends. ...</div><div class='long'><p>Fired when the application ends.</p>\n</div></div></div><div id='event-applicationstart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-applicationstart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-applicationstart' class='name expandable'>applicationstart</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when the NGN application starts. ...</div><div class='long'><p>Fired when the NGN application starts.</p>\n</div></div></div><div id='event-beforecreatedatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-beforecreatedatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-beforecreatedatasource' class='name expandable'>beforecreatedatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a> connection</span> )</div><div class='description'><div class='short'>This event is fired just prior to the creation of a DSN. ...</div><div class='long'><p>This event is fired just prior to the creation of a <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the new datasource.</p>\n</div></li><li><span class='pre'>connection</span> : <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a><div class='sub-desc'><p>The connection about to be created.</p>\n</div></li></ul></div></div></div><div id='event-beforeremovedatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-beforeremovedatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-beforeremovedatasource' class='name expandable'>beforeremovedatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a> connection</span> )</div><div class='description'><div class='short'>This event is fired just prior to removeing a DSN. ...</div><div class='long'><p>This event is fired just prior to removeing a <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the datasource.</p>\n</div></li><li><span class='pre'>connection</span> : <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a><div class='sub-desc'><p>The connection object about to be removeed.</p>\n</div></li></ul></div></div></div><div id='event-createdatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-createdatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-createdatasource' class='name expandable'>createdatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name, <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a> connection</span> )</div><div class='description'><div class='short'>This event is fired just after the creation of a DSN. ...</div><div class='long'><p>This event is fired just after the creation of a <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the new datasource.</p>\n</div></li><li><span class='pre'>connection</span> : <a href=\"#!/api/NGN.datasource.Connection\" rel=\"NGN.datasource.Connection\" class=\"docClass\">NGN.datasource.Connection</a><div class='sub-desc'><p>The connection object just created.</p>\n</div></li></ul></div></div></div><div id='event-ready' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-ready' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-ready' class='name expandable'>ready</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when the application is ready. ...</div><div class='long'><p>Fired when the application is ready.</p>\n</div></div></div><div id='event-registerserver' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-registerserver' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-registerserver' class='name expandable'>registerserver</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when a server is registered ...</div><div class='long'><p>Fired when a server is registered</p>\n</div></div></div><div id='event-removedatasource' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-removedatasource' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-removedatasource' class='name expandable'>removedatasource</a>( <span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> name</span> )</div><div class='description'><div class='short'>This event is fired just after the destruction of a DSN. ...</div><div class='long'><p>This event is fired just after the destruction of a <a href=\"#!/api/NGN.app.Application-property-DSN\" rel=\"NGN.app.Application-property-DSN\" class=\"docClass\">DSN</a>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The reference name of the new datasource.</p>\n</div></li></ul></div></div></div><div id='event-unregisterserver' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='NGN.app.Application'>NGN.app.Application</span><br/><a href='source/Application.html#NGN-app-Application-event-unregisterserver' target='_blank' class='view-source'>view source</a></div><a href='#!/api/NGN.app.Application-event-unregisterserver' class='name expandable'>unregisterserver</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>Fired when a server is unregistered/removed ...</div><div class='long'><p>Fired when a server is unregistered/removed</p>\n</div></div></div></div></div></div></div>","mixins":[],"id":"class-NGN.app.Application","html_meta":{"aside":[]},"files":[{"href":"Application.html#NGN-app-Application","filename":"Application.js"}]});