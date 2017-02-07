var express = require('express');
var Movie   = require('../models/movie');
var router  = express.Router();

/* GET detail page */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log('nodeID : ' + id);
    Movie.findById(id,function(err, movie) 
    {
        if(err) 
        {
            console.log(err);
        }
        res.render('detail', {
            title: '详情页' + movie.title,
            movie: movie
        });
    });
});

module.exports = router;
