define(["require", "exports", "routes/index"], function(require, exports, __routes__) {
    
    
    
    var routes = __routes__;

    var express = require('express');
    var engine = require('ejs');
    var app = express();

    function start() {
        app.configure(function () {
            app.set('view engine', 'ejs');
            app.engine('.html', engine.renderFile);
            app.use(express.bodyParser());
            app.use(express.methodOverride());
            app.use(express.static('public'));
        });

        app.get('/', routes.index);

        app.listen(8886);
        console.log("Server has started.");
    }
    exports.start = start;
});
