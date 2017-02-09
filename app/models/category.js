var moogoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = moogoose.model('Category', CategorySchema);

module.exports = Category;
