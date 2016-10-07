var express = require('express');
var router = express.Router();

/* GET movie listing. */
// router.get('/', function(req, res, next) {
//   res.render('detail', { title: 'Movie' });
// });

/* GET detail page */
router.get('/:id', function(req, res, next){
    res.render('detail', { 
        title : 'Movie 详情页面',
        movie : {
            doctor : '何塞·帕迪里亚',
            title  : '机械战警',
            country: '美国',
            year   : '2014',
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
            language :'英语',
            flash : 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
            summary: '《机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。影片的故事背景与原版基本相同，故事设定在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
        } 
    });
});

module.exports = router;
