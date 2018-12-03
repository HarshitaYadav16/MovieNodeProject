const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Movie = require('../models/movie');
const path = require("path");
const jwt = require('jsonwebtoken');
const moment = require('moment');
const ensureToken = require('../middleware/ensuretoken');

//POST route for new user registration
/** 
 * @api {post} /register Registration of new user
 * @apiName Register
 * @apiGroup User
 * @apiSuccess {JSON} JWT of the registered user
 * @apiError 400 Bad Request Error All fields are required to be filled by the user Auth failed.
 */
router.post('/register', (req, res, next) => {

    if (req.body.user_name &&
        req.body.user_id &&
        req.body.email &&
        req.body.password) {

        const userData = {
            user_name: req.body.user_name,
            user_id: req.body.user_id,
            email: req.body.email,
            password: req.body.password
        }

        const user = {
            email: userData.email,
            username: userData.user_name
        };
        const token = jwt.sign({
            user
        }, 'my_secret_key');
        res.json({
            token: token
        });

        User.create(userData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/homepage');
            }
        });

    } else if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, (error, user)=>{
            if (error || !user) {
                var err = new Error('Wrong username or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                req.session.username = user.user_name;
                console.log("Login user " + req.session.username);
                return res.redirect('/homepage');
            }
        });
    } else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})


//POST route to add movie
/** 
 * @api {post} /addmovie/ Add movie
 * @apiName addmovie
 * @apiGroup Movie
 * @apiSuccess {String} Response that movie is added
 * @apiError Error status 400
 */
router.post('/addmovie', ensureToken, (req, res, next) => {

    if (req.body.movie &&
        req.body.actors &&
        req.body.director &&
        req.body.producer &&
        req.body.released_date &&
        req.body.budget) {

        const movieData = {
            username: req.session.username,
            movie: req.body.movie,
            actors: req.body.actors,
            director: req.body.director,
            producer: req.body.producer,
            released_date: req.body.released_date,
            budget: req.body.budget
        }

        Movie.create(movieData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                res.send("movie added");
            }
        });

    } else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})


//GET route to get movie details
/** 
 * @api {get} /homepage redirects to homepage of application
 * @apiName homepage
 */
router.get('/homepage', (req, res, next) => {
    return res.sendFile(path.join(__dirname + '/../views/homepage.html'));
});



//GET route to get movie details
/** 
 * @api {get} /getAllMovies Get movie information according to the user
 * @apiName getAllMovies
 * @apiGroup Movie
 * @apiSuccess {String} get movie movie name
 * @apiSuccess {String} get actors All actors of the movie
 * @apiSuccess {String} get director director of the movie
 * @apiSuccess {String} get producer producer of the movie
 * @apiSuccess {Date} get released_date released date of the movie
 * @apiSuccess {Number} get budget budget of the movie
 * @apiError Sends error
 */
router.get('/getAllMovies', (req, res, next) => {
	if (req.session.username == "admin") {
            Movie.find((err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });
        } else {
            Movie.find({
                    username: req.session.username
            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });

        }
});

//POST route to get movie details
/** 
 * @api {post} /getMovie get movie information
 * @apiName getMovie
 * @apiGroup Movie
 * @apiSuccess {String} get movie movie name
 * @apiSuccess {String} get actors All actors of the movie
 * @apiSuccess {String} get director director of the movie
 * @apiSuccess {String} get producer producer of the movie
 * @apiSuccess {Date} get released_date released date of the movie
 * @apiSuccess {Number} get budget budget of the movie
 * @apiError Sends error
 */
router.post('/getMovie', (req, res, next) => {
    let input = req.body.searchvalue;
    if (moment(input, moment.ISO_8601, false).isValid()) {
        console.log("date");
        if (req.session.username == "admin") {
            Movie.find({
                "released_date": input

            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });
        } else {
            Movie.find({
                $and: [{
                    username: req.session.username
                }, {
                    "released_date": input
                }]

            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });

        }

    } else if (isNaN(input)) {
        console.log("string");
        if (req.session.username == "admin") {
            Movie.find({
                $or: [{
                    "movie": input
                }, {
                    "actors": input
                }, {
                    "director": input
                }, {
                    "producer": input
                }]


            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });
        } else {
            Movie.find({
                $and: [{
                    username: req.session.username
                }, {
                    $or: [{
                        "movie": input
                    }, {
                        "actors": input
                    }, {
                        "director": input
                    }, {
                        "producer": input
                    }]
                }]


            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });

        }

    } else {
        console.log("number");
        if (req.session.username == "admin") {
            Movie.find({
                "budget": input


            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });

        } else {
            Movie.find({
                $and: [{
                    username: req.session.username
                }, {
                    "budget": input
                }]


            }, (err, data) => {
                if (err) res.send(err);
                else return res.send(data);
            });


        }

    }

});



//PUT route to get movie details
/** 
 * @api {put} /updateMovie/:id Updates movie information
 * @apiName updateMovie
 * @apiGroup Movie
 * @apiSuccess {String} updates movie movie name
 * @apiSuccess {String} updates actors All actors of the movie
 * @apiSuccess {String} updates director director of the movie
 * @apiSuccess {String} updates producer producer of the movie
 * @apiSuccess {Date} updates released_date released date of the movie
 * @apiSuccess {Number} updates budget budget of the movie
 * @apiError Sends error
 */
router.put('/updateMovie/:id', ensureToken, (req, res) => {
    Movie.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                movie: req.body.movie,
                actors: req.body.actors,
                director: req.body.director,
                producer: req.body.producer,
                released_date: req.body.released_date,
                budget: req.body.budget
            }
        }, {
            upsert: true
        },
        (err, data) => {
            if (err) res.send(err);
            else {
                console.log(data);
                res.send("Movie Updated");
            }
        }
    );
});

//DELETE route to delete user according to ID
/** 
 * @api {delete} /deleteMovie/:id Deletes movie information
 * @apiName deleteMovie
 * @apiGroup Movie
 * @apiParam {Number} id Movie unique ID.
 * @apiSuccess {String} delete movie movie name
 * @apiSuccess {String} delete actors All actors of the movie
 * @apiSuccess {String} delete director director of the movie
 * @apiSuccess {String} delete producer producer of the movie
 * @apiSuccess {Date} delete released_date released date of the movie
 * @apiSuccess {Number} delete budget budget of the movie
 * @apiError Sends the error 
 */
router.delete('/deleteMovie/:id', ensureToken, (req, res) => {
    console.log(req.params.id);
    Movie.findOneAndRemove({
        _id: req.params.id
    }, (err, data) => {
        if (err) res.send(err);
        else {
            console.log(data);
            res.send("Movie Deleted");
        }
    });
});



//GET route for user to logout
/** 
 * @api {get} /logout Destroys session and returns to login page
 * @apiName logout
 * @apiGroup Movie
 * @apiSuccess {String} redirects to login page
 * @apiError Sends the error 
 */
router.get('/logout', (req, res, next) => {
    if (req.session) {
        // delete session object
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;