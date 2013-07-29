define(["require", "exports", 'mongodb'], function(require, exports, __mongodb__) {
    /// <reference path="batla/batla.ts" />
    /// <reference path="../defs/mongodb.d.ts" />
    var mongodb = __mongodb__;
    

    var server = new mongodb.Server('localhost', 27017, { auto_reconnect: true });
    var db = new mongodb.Db('mongodb', server, { w: 1 });
    db.open(function () {
    });

    function addTodayStatictic(statistics) {
        db.collection('clansStatistics', function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }
            var nowDate = new Date();
            nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
            collection.insert({
                data: nowDate,
                clansStatistics: statistics
            }, function () {
            });
        });
    }
    exports.addTodayStatictic = addTodayStatictic;

    function getWeekTop100Statistic() {
        db.collection('clansStatistics', function (err, collection) {
            if (err) {
                console.log(err);
                return;
            }
            collection.find('', function () {
            });
        });
    }
    exports.getWeekTop100Statistic = getWeekTop100Statistic;
});
//@ sourceMappingURL=db.js.map
