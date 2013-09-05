define(["require", "exports", "server", "router", "requestHandlers"], function(require, exports, __server__, __router__, __requestHandlers__) {
    var server = __server__;
    var router = __router__;
    var requestHandlers = __requestHandlers__;

    function start() {
        var handle = {
            "/": requestHandlers.start
        };

        server.start(router.route, handle);
    }
    exports.start = start;
});
