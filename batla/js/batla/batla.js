define(["require", "exports", "http", "xml2js"], function(require, exports, __http__, __xml2js__) {
    /// <reference path="../../defs/node-xml2js.d.ts" />
    /// <reference path="../../defs/node.d.ts" />
    var http = __http__;
    var xml2js = __xml2js__;

    (function (Batla) {
        var ClanStatistic = (function () {
            function ClanStatistic(clanId, position, clanName, clanIcon, summRate) {
                this.clanId = clanId;
                this.position = position;
                this.clanName = clanName;
                this.clanIcon = clanIcon;
                this.summRate = summRate;
            }
            return ClanStatistic;
        })();
        Batla.ClanStatistic = ClanStatistic;

        var Reader = (function () {
            function Reader() {
                this.ReadClansRating = function (callback) {
                    var nowDate = new Date();
                    if (Reader.savedDate !== null && Reader.savedDate.getFullYear() === nowDate.getFullYear() && Reader.savedDate.getMonth() === nowDate.getMonth() && Reader.savedDate.getDate() === nowDate.getDate() && Reader.savedStatics !== null) {
                        console.log("Read saved data.");
                        callback(Reader.savedStatics);
                        return;
                    }

                    console.log("Get data from another server...");
                    var result = [];
                    for (var i = 0; i < 10; i++) {
                        var options = {
                            host: "batla.ru",
                            path: "/test/cache/get_clan_rating_data.php?page=" + i,
                            method: 'GET'
                        };
                        this.sendRequest(options, result, i);
                    }
                    setTimeout(function () {
                        Reader.savedDate = new Date();
                        Reader.savedStatics = result;
                        callback(result);
                    }, 500);
                };
                this.sendRequest = function (options, mas, pageNumber) {
                    var index = pageNumber * 10;
                    http.request(options, function (r) {
                        var str = '';
                        r.on('data', function (chunk) {
                            str += chunk;
                        });
                        r.on('end', function () {
                            xml2js.parseString(str, function (err, data) {
                                data.ClanRating.Clan.forEach(function (clan) {
                                    mas[index] = new ClanStatistic(clan.$.clan_id, clan.$.pos, clan.$.clan_name, clan.$.clan_icon, clan.$.summ_rate);
                                    index++;
                                });
                            });
                        });
                    }).end();
                };
            }
            Reader.savedStatics = null;
            Reader.savedDate = null;
            return Reader;
        })();
        Batla.Reader = Reader;
    })(exports.Batla || (exports.Batla = {}));
    var Batla = exports.Batla;
});
//@ sourceMappingURL=batla.js.map
