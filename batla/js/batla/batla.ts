/// <reference path="../../defs/node-xml2js.d.ts" />
/// <reference path="../../defs/node.d.ts" />

import http = require("http");
import xml2js = require("xml2js");

export module Batla {
    export interface IClanStatistic {
        clanId: number;
        position: number;
        clanName: string;
        clanIcon: string;
        summRate: number;
    }

    export class ClanStatistic implements IClanStatistic {
        constructor(
            public clanId: number,
            public position: number,
            public clanName: string,
            public clanIcon: string,
            public summRate: number) {
        }
    }

    export class Reader {
        private static savedStatics: IClanStatistic[] = null;
        private static savedDate: Date = null;

        ReadClansRating = function (callback: (clanStatistics: IClanStatistic[]) => void): void {
            var nowDate = new Date();
            if (Reader.savedDate !== null &&
                Reader.savedDate.getFullYear() === nowDate.getFullYear() &&
                Reader.savedDate.getMonth() === nowDate.getMonth() &&
                Reader.savedDate.getDate() === nowDate.getDate() &&
                Reader.savedStatics !== null) {
                    console.log("Read saved data.");
                    callback(Reader.savedStatics);
                    return;
            }

            console.log("Get data from another server...");
            var result: IClanStatistic[] = [];
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
        }

        private sendRequest = function (options: Object, mas: IClanStatistic[], pageNumber: number) {
            var index = pageNumber * 10;
            http.request(options, function (r) {
                var str = '';
                r.on('data', function (chunk) {
                    str += chunk;
                });
                r.on('end', function () {
                    xml2js.parseString(str, function (err, data) {
                        data.ClanRating.Clan.forEach(function (clan) {
                            mas[index] = new ClanStatistic(
                                clan.$.clan_id,
                                clan.$.pos,
                                clan.$.clan_name,
                                clan.$.clan_icon,
                                clan.$.summ_rate
                            );
                            index++;
                        });
                    });
                });
            }).end()
        }
    }
}