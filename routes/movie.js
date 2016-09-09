var express = require('express');
var router = express.Router();

/* GET movie listing. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: 'Movie' });
});

/* GET detail page */
router.get('/:id', function(req, res, next){
    res.render('detail', { title: 'Movie 详情页面' });
});

module.exports = router;
