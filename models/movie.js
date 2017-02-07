var moogoose = require('mongoose');
var MovieSchema = require('../schemas/movie');
var Movie = moogoose.model('Movie',MovieSchema);

module.exports = Movie;
