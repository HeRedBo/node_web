var User = require('../app/controllers/user');
var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');

module.exports = function(app)
{
    // pre handle user
    app.use(function(req, res, next)
    {
        var _user = req.session.user;
        app.locals.user = _user;
        next();
    });
    // Index page
    app.get('/',Index.index);
    // User
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/user/logout', User.logout);
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.list);
    app.post('/user/signup',User.signup);
    app.post('/user/signin', User.signin);

    // Movies
    app.get('/movie/:id',Movie.detail);
    app.get('/admin/movie/create', User.signinRequired, User.adminRequired, Movie.create);
    app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired,  Movie.update);
    app.get('/admin/movie/list',  User.signinRequired, User.adminRequired, Movie.list);
    app.post('/admin/movie/save', User.signinRequired, User.adminRequired, Movie.save);
    app.delete('/admin/movie/list',  User.signinRequired, User.adminRequired, Movie.del);

    // Comment
    app.post('/user/comment',User.signinRequired, Comment.save);

    // Category
    app.get('/admin/category/create', User.signinRequired, User.adminRequired, Category.create);
    app.get('/admin/category/list', User.signinRequired, User.adminRequired,Category.list);
    app.get('/admin/category/update/:id', User.signinRequired, User.adminRequired,Category.update);
    app.post('/admin/category/save', User.signinRequired, User.adminRequired, Category.save);
    app.delete('/admin/category/list',User.signinRequired, User.adminRequired,Category.del);

    // results
    app.get('/results', Index.search); 
}
