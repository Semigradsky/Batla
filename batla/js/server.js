define(["require", "exports", "db", "http", "url", "batla/batla"], function(require, exports, __db__, __http__, __url__, __batla__) {
    var db = __db__;
    var http = __http__;
    var url = __url__;
    var batla = __batla__;

    function start(route, handle) {
        function onRequest(request, response) {
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
    exports.start = start;
});
