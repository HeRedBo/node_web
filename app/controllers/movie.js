var Movie   = require('../models/movie');
var Comment = require('../models/comment');
var Category= require('../models/Category');

var _      = require('underscore');

module.exports = {

    detail : function(req, res)
    {
        var id = req.params.id;
        Movie.findById(id,function(err, movie) 
        {
            if(err) 
            {
                console.log(err);
            }
            console.log('movie:')
            console.log(movie);
            Comment
                .find({ movie:id})
                .populate('from','name')
                .populate('reply.from reply.to', 'name')
                .exec(function(err, comments) 
                {
                    
                    res.render('detail', {
                        title: '详情页' + movie.title,
                        movie: movie,
                        comments : comments
                    });
                    console.log('render OK ')
                });
    
        });
    },

    create : function(req, res)
    {
        Category.find({},function(err, categories){
            console.log(categories);
            if(err)
            {
                console.log(err);
            }
            res.render('form',{
                title: 'imooc 后台录入',
                categories : categories,
                movie :{}
            });
        });
    },


    save : function(req, res)
    {
        var id       = req.body.movie._id;
        var movieObj = req.body.movie;
        var _movie;
        if(id) 
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
                    res.redirect('/movie/' + movie._id);
                });
            });
        } 
        else
        {
            _movie =new Movie(movieObj);

            var categoryId = movieObj.category;
            var categoryName = movieObj.categoryName;
            _movie.save(function (err, movie) 
            {
                if(err) {
                    console.log(err);
                }
                if(categoryId)
                {
                    Category.findById(categoryId, function(err, category)
                    {
                        category.movies.push(movie._id);
                        category.save(function(err, category){
                            console.log('saveCatMovie');
                            if(err)
                            {
                                console.log('category save failed error info:');
                                console.log(err);
                            }
                            res.redirect('/movie/' + movie._id);
                        })
                    });
                }
                else if (categoryName)
                {
                    var category = new Category({
                        name : categoryName,
                        movies : [movie._id]
                    });

                    Category.save(function(err, category) 
                    {
                        movie.category = category._id;
                        movie.save(function(err, movie)
                        {
                            res.redirect('/movie/' + movie._id);
                        });
                    })
                }
                
            });
        }

    },

    update : function(req, res)
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
                Category.find({}, function(err, categories) 
                {
                    res.render('form',
                    {
                        title : '后台更新',
                        movie : movie,
                        categories : categories
                    })
                })
                
            });
        }
    },

    list : function(req, res)
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
    },

    del : function()
    {
        var id = req.query.id;
        if(id) 
        {
            Movie.remove({_id : id }, function(err, movie) 
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
    },
}