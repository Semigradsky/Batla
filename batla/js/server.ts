/// <reference path="db.ts" />
/// <reference path="batla/batla.ts" />
/// <reference path="../defs/node.d.ts" />

import db = require("db");
import http = require("http");
import url = require("url");
import batla = require("batla/batla");

export function start(route: (handle: Object, pathname: string, response: http.ServerResponse, request: http.ServerRequest) => void , handle: Object) {
    function onRequest(request: http.ServerRequest, response: http.ServerResponse) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request);
    }

    function getClansRating() {
        reader.ReadClansRating(function (statistics) {
            db.addTodayStatictic(statistics);
        });
    }
    
    var reader = new batla.Batla.Reader();
    getClansRating();
    setInterval(getClansRating, 1000 * 60 * 60 * 24);

    http.createServer(onRequest).listen(8886);
    console.log("Server has started.");
}