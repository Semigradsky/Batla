define(["require", "exports", "../public/javascripts/batla"], function(require, exports, __batla__) {
    
    var batla = __batla__;

    function index(req, res) {
        var reader = new batla.Batla.Reader();
        reader.ReadClansRating(function (clansRatings) {
            res.render('index.html', { clansRatings: clansRatings });
        });
    }
    exports.index = index;
    ;
});
