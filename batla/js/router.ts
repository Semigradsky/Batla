/// <reference path="../defs/node.d.ts" />

import http = require("http");

export function route(handle: Object, pathname: string, response: http.ServerResponse, request: http.ServerRequest) {
    console.log("About to route a request for " + pathname);

    var content = '';
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}