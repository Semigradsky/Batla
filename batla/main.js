var requirejs = require('requirejs');

requirejs.config({
    baseUrl: ''
});

requirejs(['server'], function (app) {
    console.log('start');
    app.start();
});