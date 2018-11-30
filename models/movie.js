const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
	username: String,
    movie: String,
    actors: [String],
    director: String,
    producer: String,
	released_date: Date,
	budget: Number
});


const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;