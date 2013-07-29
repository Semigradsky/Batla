define(["require", "exports", "batla/batla"], function(require, exports, __batla__) {
    
    var batla = __batla__;

    function start(response, request) {
        console.log("Request handler 'start' was called.");
        var responseBody = "<!DOCTYPE html><html><head><meta charset='utf-8'/></head><body>";

        var table = "<table><thead><tr><th>Position</th><th>Clan Icon</th><th>Clan Name</th><th>Rating</th><th>Clan Id</th></tr></thead><tbody>";
        var reader = new batla.Batla.Reader();
        reader.ReadClansRating(function (clansRatings) {
            clansRatings.forEach(function (item) {
                table += "<tr><td>" + item.position + "</td><td><img src='http://batla.ru/test/i/clans/" + item.clanIcon + "'/>" + "</td><td>" + item.clanName + "</td><td>" + item.summRate + "</td><td>" + item.clanId + "</td></tr>";
            });
            table += "</tbody></table>";
            responseBody += table + "</body></html>";

            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(responseBody);
            response.end();
        });
    }
    exports.start = start;
});
