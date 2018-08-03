const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Comment = require('../models/comment');
const Movie = require('../models/movie');

router.get('/', (req, res, next) => {
  Comment.find()
      .select('-__v')
      .exec()
      .then(docs => {
          res.status(200).json(docs);
      })
      .catch(err => {
          res.status(500).json({
              error: err
          });
      });
});

router.post('/', (req, res, next) => {
    const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        movie: req.body.movieId,
        comment: req.body.comment
    });
    comment.save()
        .then(result => {
            console.log(result);
            res.status(200).json(req.body.comment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:movieId', (req, res, next) => {
    Comment.find({movie: req.params.movieId})
        .exec()
        .then(movies => {
            const response = {
                movie: req.params.movieId,
                comments: movies.map(movie => {
                    return {
                        comment: movie.comment
                    }
                })

            };
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;