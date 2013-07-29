/// <reference path="router.ts" />
/// <reference path="server.ts" />

import server = require("server");
import router = require("router");
import requestHandlers = require("requestHandlers");

export function start() {
    var handle = {
        "/": requestHandlers.start
    }

    server.start(router.route, handle);
}