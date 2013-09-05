/// <reference path="../public/javascripts/batla.ts" />
/// <reference path="../defs/express3.d.ts" />

import express = require("express3")
import batla = require("../public/javascripts/batla");

export function index(req: express.Request, res: express.Response){
    var reader = new batla.Batla.Reader();
    reader.ReadClansRating(function (clansRatings: batla.Batla.IClanStatistic[]) {
        res.render('index.html', { clansRatings: clansRatings })
    });
};