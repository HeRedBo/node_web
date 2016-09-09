var express = require('express');
var router = express.Router();

/* GET movie home listing. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Movie' });
});

/* GET admin page listing */
router.get('/movie', function(req, res, next) {
    res.render('admin', { title: 'imooc 后台录入' });
});

/* GET admin list page listring */
router.get('/list', function(req, res, next) {
    res.render('list', { title: 'imooc 后台数据列表' });
});


module.exports = router;
