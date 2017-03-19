
var User   = require('../models/user');

module.exports = {

  showSignup : function(req, res)
  {
    res.render('signup',{
      title : '注册页面'
    });
  }, 

  showSignin : function(req, res) 
  {
    res.render('signin', {
      title : '登录页面'
    });
  },

  signup : function(req, res) 
  {
    var _user = req.body.user;
    User.findOne({name : _user.name}, function(err, user){
      if(err) {
        console.log(err);
      }

      if(user) {
        return res.redirect('/');
      } else {
         var user = new User(_user);
         user.save(function(err, user) {
            if(err) {
              console.log(err);
            }
            res.redirect('/');
        });
      }
    });
  },

  signin : function(req,res) 
  {
      var _user    = req.body.user;
      var name     = _user.name;
      var password = _user.password;

      User.findOne({name: _user.name}, function(err, user) 
      {
        if(err) {
          console.log(err);
        }

        if(!user) {
            return res.redirect('/signup');
        }
        user.comparePassword(password, function(err, isMatch) 
        {
          if(err) 
          {
            console.log(err);
          }

          if(isMatch) 
          {
              req.session.user = user;
              return res.redirect('/');
          }
          else
          {
            return res.redirect('/signin');
          }
      });
    });
  },

  // logout
  logout : function(req, res)
  {
    delete req.session.user;
    res.redirect('/');
  },

  // 用户列表页
  list : function(req, res)
  {
    User.fetch(function(err, users)
    {
        if (err)
        {
            console.log(err);
        }
        res.render('userlist', {
            title: 'imooc 用户列表',
            users : users
        });
    });
  },

  signinRequired : function(req, res, next)
  {
    var user = req.session.user;
    console.log('signinRequired:');
    console.log(user);
    if(!user) 
    {
       return res.redirect('/signin');
    }
    next();
  },

  adminRequired : function(req, res, next)
  {
    var user = req.session.user;
    
    if(user.role <= 10) 
    {
       return res.redirect('/signin');
    }
    next();
  },
}





