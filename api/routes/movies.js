const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('sync-request');

const Movie = require('../models/movie');

router.get('/',(req, res, next) => {
    Movie.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Title: doc.Title,
                        Year: doc.Year,
                        Director: doc.Director,
                        Actors: doc.Actors,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/movies/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/',(req, res, next) => {
    let response = request('GET', 'http://www.omdbapi.com/?apikey=ada540bb&t=' + req.body.Title);
    let jsonObj = JSON.parse(response.getBody('utf8'));
    console.log(jsonObj);
    const movie = new Movie({
                _id: new mongoose.Types.ObjectId(),
                Title: req.body.Title,
                Year: jsonObj.Year,
                Director: jsonObj.Director,
                Actors: jsonObj.Actors
    });
    movie
        .save()
        .then(result => {
        console.log(result);
            res.status(201).json({
                message: 'Created movie successfully',
                createdMovie: {
                    _id: result._id,
                    Title: req.body.Title,
                    Year: jsonObj.Year,
                    Director: jsonObj.Director,
                    Actors: jsonObj.Actors,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/movies/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: 'We are sorry, there seems to be some kind of problem, perhaps with 3rd party API'
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Movie.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({doc});
            } else {
                res.status(404).json({message: 'No valid entry found for provided Id'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;
