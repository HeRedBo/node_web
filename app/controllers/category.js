var Category  = require('../models/category');
var _         = require('underscore');

module.exports = {
    create : function(req, res)
    {
        res.render('category_admin', {
            title : 'Imooc 后台分类录入',
            category : {
                name : '',
            }
        });
    },

    save : function(req, res)
    {
        var id = req.body.category._id;
        var _category = req.body.category;
        console.log(req.body.category);
        if(id)
        {
            Category.findById(id, function(err, category){
                if(err) 
                {
                    console.log(err);
                }
                _category = _.extend(category, _category);
                _category.save(function(err, category){
                    if(err) 
                    {
                        console.log(err);
                    }
                    res.redirect('/admin/category/list');
                })
            });
        }
        else
        {
            var category  = new Category(_category);
            console.log('ADSAS');
            console.log(category);
            category.save(function(err, category) {
                if(err)
                {
                    console.log(err);
                }

                res.redirect('/admin/category/list');
            });
        }
    },
        
        

    list : function (req, res)
    {
        Category.fetch(function(err, categories)
        {
            if(err) 
            {
                console.log(err);
            }

            res.render('categorylist',{
                title : 'imooc 分类列表页',
                categories : categories
            });
        })
    },

    del : function(req, res) 
    {
        var id = req.query.id;
        if(id) 
        {
            Category.remove({_id : id }, function(err, cateory) 
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

    update : function(req, res)
    {
        var id =req.params.id;
        if(id)
        {
            Category.findById(id, function(err, category) 
            {
                if(err)
                {
                    console.log(err);
                }
                res.render('category_admin',
                {
                    title : '后台更新',
                    category : category
                })
            });
        }
    },

}



