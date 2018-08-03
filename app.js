const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const movieRoutes = require('./api/routes/movies');
const commentRoutes = require('./api/routes/comments');

mongoose.connect('mongodb+srv://joseph:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-o9y4f.mongodb.net/test?retryWrites=true',
    {useNewUrlParser: true}
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, GET');
      return res.status(200).json({});
    };
    next();
});

app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
   res.status(error.status || 500);
   res.json({
       error: {
           message: error.message
       }
   });
});

module.exports = app;