var requirejs = require('requirejs');

requirejs.config({
    baseUrl: 'js',
});

requirejs(['app'], function (app) {
    app.start();
});