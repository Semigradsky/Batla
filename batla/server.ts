/// <reference path="public/javascripts/batla.ts" />
/// <reference path="public/javascripts/db.ts" />
/// <reference path="defs/express3.d.ts" />

import db = require("public/javascripts/db");
import batla = require("public/javascripts/batla");
import express3 = require("express3");
import routes = require("routes/index") 

var express = require('express');
var engine = require('ejs');
var app:express3.Application = express();

export function start() {
    /*
    function getClansRating() {
        reader.ReadClansRating(function (statistics) {
            db.addTodayStatictic(statistics);
        });
    }
    var reader = new batla.Batla.Reader();
    getClansRating();
    setInterval(getClansRating, 1000 * 60 * 60 * 24);
    */

    // Configure

    app.configure(function () {
        app.set('view engine', 'ejs');
        app.engine('.html', engine.renderFile);
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static('public'));
    });

    // Routes
    app.get('/', routes.index);

    app.listen(8886);
    console.log("Server has started.");
}