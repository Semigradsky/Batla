/// <reference path="batla/batla.ts" />
/// <reference path="../defs/mongodb.d.ts" />

import mongodb = require('mongodb');
import bm = require('batla/batla');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect: true})
var db = new mongodb.Db('mongodb', server, {w: 1});
db.open(function () { });

export interface ClansStatistics {
    _id: mongodb.ObjectID;
    date: Date;
    clansStatistics: bm.Batla.IClanStatistic[];
}

export function addTodayStatictic(statistics: bm.Batla.IClanStatistic[]) {
    db.collection('clansStatistics', function (err: any, collection: mongodb.Collection) {
        if (err) { console.log(err); return; }
        var nowDate = new Date();
        nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());
        collection.insert({
            data: nowDate,
            clansStatistics: statistics
        }, function () { });
    });
}

export function getWeekTop100Statistic() {
    db.collection('clansStatistics', function (err: any, collection: mongodb.Collection) {
        if (err) { console.log(err); return; }
        collection.find('', function () {

        });
    });
}