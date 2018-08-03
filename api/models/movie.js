const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
   _id: mongoose.Schema.Types.ObjectId,
    Title: { type: String, required: true },
    Year: Number,
    Director: String,
    Writer: String,
    Actors: String
}, {
    minimize: false
});

module.exports = mongoose.model('Movie', movieSchema);