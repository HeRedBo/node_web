var express = require('express');
var Movie   = require('../models/movie');
var router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
    console.log('session : ');
    console.log(req.session);
    // 查询数据库 获取数据
    Movie.fetch(function(err,movies) 
    {
        if(err) {
            console.log(err);
        }
        res.render('index', 
        {
          title: 'Imooc 首页',
          movies: movies
        });
    });
});

module.exports = router;
