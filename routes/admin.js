var express = require('express');
var Movie   = require('../models/movie');
var _       = require('underscore');
var router  = express.Router();

/* GET movie home listing. */
router.get('/', function(req, res, next) 
{
  res.render('admin', { title: 'Movie' });
});

/* GET admin page listing */
router.get('/movie', function(req, res, next) 
{
    res.render('admin', 
    {
        title: 'imooc 后台录入' ,
        movie :{
            title : '',
            language : '',
            doctor : '',
            country : '',
            poster : '',
            year : '',
            flash : '',
            summary : '',
    }});
});

/* POST admin page movie*/
router.post('/movie/new', function(req, res, next) 
{
    var id       = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if(id !== 'undefined') 
    {
        Movie.findById(id, function(err, movie) {
            if(err) 
            {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, movie) {
                if(err) {
                    console.log(err);
                }
                console.log('131231213')
                console.log(movie);
                res.redirect('/movie/' + movie._id);
            });
        });
    } 
    else
    {
        _movie = new Movie({
            title    : movieObj.title,
            doctor   : movieObj.doctor,
            language : movieObj.language,
            country  : movieObj.country,
            year     : movieObj.year,
            poster   : movieObj.poster,
            flash    : movieObj.flash,
            summary  : movieObj.summary
        });
        _movie.save(function (err, movie) 
        {
            if(err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });
    }
});

/* GET admin update listeniing */
router.get('/update/:id' , function(req, res, next)
{
    var id =req.params.id;
    if(id)
    {
        Movie.findById(id, function(err, movie) 
        {
            if(err)
            {
                console.log(err);
            }
            res.render('admin',
            {
                title : '后台更新',
                movie : movie
            })
        });
    }
});
/* GET admin list page listening */
router.get('/list', function(req, res, next) 
{
    Movie.fetch(function(err, movies)
    {
        if (err)
        {
            console.log(err);
        }
        res.render('list', {
            title: 'imooc 后台数据列表',
            movies : movies
        });
    });
});

// //delete 
router.delete('/list', function(req, res, next)
{
    var id = req.query.id;
    if(id) {
        Movie.remove({
            _id : id
        }, function(err, movie) 
        {
            if(err) 
            {
                console.log(err);
            } 
            else 
            {
                res.json({
                    success : 1
                });
            }

        });
    }
});

module.exports = router;
