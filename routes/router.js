const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Movie = require('../models/movie');
const path = require("path");
const jwt = require('jsonwebtoken');
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
				return res.redirect('/showhomepage'); 
            }
        });

    } else if (req.body.logusername && req.body.logpassword) {
    User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
		  if(req.body.logusername == "admin"){
			req.session.userId = user._id;
			return res.redirect('/adminprofile');  
		  }
		  else{
			req.session.userId = user._id;
			req.session.username = user.user_name;
			//console.log(req.session.username);
			return res.redirect('/userprofile');  
		  } 
      }
    });
  }
	else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})


//POST route for new movie
/** 
* @api {post} /register Registration of new user 
* @apiName Register 
* @apiGroup User  
* @apiSuccess {JSON} JWT of the registered user 
* @apiError 400 Bad Request Error All fields are required to be filled by the user Auth failed.
*/


router.post('/addmovie', (req, res, next) => {

    if (req.body.username &&
		req.body.movie &&
        req.body.actors &&
        req.body.director &&
		req.body.producer &&
		req.body.released_date &&
        req.body.budget) {

        const movieData = {
			username: req.body.username,
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


//GET admin login
router.get('/adminprofile', function (req, res, next) {
	Movie.find((err, data) => {
        if (err) res.send(err);
        else res.send(data);
    });
	
});

//GET user login
router.get('/userprofile', function (req, res, next) {
	//console.log(req.session.username);
	Movie.find({
		username:'Harshi'//req.session.username
	},{
		 name: 1, _id:0
	},(err, data) => {
        if (err) res.send(err);
        else res.send('<h3>Movie List</h3>'+'<h4>Movie Name: </h4>' + data[0].name + '<h4>Actor: </h4>' + data[0].actor + '<h4>Director: </h4>' + data[0].director + '<h4>Producer: </h4>' + data[0].producer + '<h4>Released Date: </h4>' + data[0].released_date + '<h4>Budget: </h4>' + data[0].budget);
		//else res.send(data);
		//else res.send()
    });
	
});


//GET user login
router.get('/getMovie/:input', function (req, res, next) {
	Movie.find({
		  $or: [{"movie": req.params.input},{"actor": { $in: [req.params.input] }},
		  {"director": req.params.input},{"producer": req.params.input},
		  {"released_date": req.params.input},{"budget": req.params.input}],
	},(err, data) => {
        if (err) res.send(err);
		else res.send(data);
    });
	
});

router.get('/getMovieByDate/:date', function (req, res, next) {
	console.log(typeof(req.params.date));
	console.log(req.params.date);
	Movie.find({
	"released_date": req.params.date
	},(err, data) => {
        if (err) res.send(err);
		else res.send(data);
    });
	
});

//GET route to get all users
/** 
* @api {get} /getUsers Request all users information 
* @apiName GetUser 
* @apiGroup User  
* @apiSuccess {String} user_name User name of the User. 
* @apiSuccess {String} user_id User Id of the User. 
* @apiSuccess {String} email Email of the User. 
* @apiSuccess {String} password Hashed password of the User.
* @apiError Sends the error Auth failed.
*/
router.get('/getallmovies', ensureToken, (req, res) => {
    Movie.find((err, data) => {
        if (err) res.send(err);
        else res.json(data);
    });
});


//GET route to get user according to ID
/** 
* @api {post} /getUserById/:id Request User information 
* @apiName getUserById 
* @apiGroup User 
* @apiParam {Number} id Users unique ID. 
* @apiSuccess {String} user_name User name of the User. 
* @apiSuccess {String} user_id User Id of the User. 
* @apiSuccess {String} email Email of the User. 
* @apiSuccess {String} password Hashed password of the User.
* @apiError Sends the error Auth failed.
*/
router.get('/getUserById/:id', ensureToken, (req, res) => {
    User.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err) res.send(err);
        else res.json(data);
    });
});

//PUT route to update user according to ID
/** 
* @api {put} /updateUser/:id Update User information 
* @apiName UpdateUser 
* @apiGroup User 
* @apiParam {Number} id Users unique ID. 
* @apiSuccess {String} updates user_name User name of the User. 
* @apiSuccess {String} updates user_id User Id of the User. 
* @apiSuccess {String} updates email Email of the User. 
* @apiSuccess {String} updates password Hashed password of the User.
* @apiError Sends the error Auth failed.
*/
router.put('/updateMovie/:id', ensureToken, function(req, res) {
    Movie.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                user_name: req.body.user_name,
                user_id: req.body.user_id,
                email: req.body.email,
                password: req.body.password
            }
        }, {
            upsert: true
        },
        function(err, data) {
            if (err) res.send(err);
            else {
                console.log(data);
                res.json(data);
            }
        }
    );
});

//DELETE route to delete user according to ID
/** 
* @api {delete} /deleteUser/:id Update User information 
* @apiName deleteUser 
* @apiGroup User 
* @apiParam {Number} id Users unique ID. 
* @apiSuccess {String} delete user_name User name of the User. 
* @apiSuccess {String} delete user_id User Id of the User. 
* @apiSuccess {String} delete email Email of the User. 
* @apiSuccess {String} delete password Hashed password of the User.
* @apiError Sends the error Auth failed.
*/
router.delete('/deleteMovie/:id', ensureToken, function(req, res) {
    Movie.findOneAndRemove({
        _id: req.params.id
    }, function(err, data) {
        if (err) res.send(err);
        else {
            console.log(data);
            res.json(data);
        }
    });
});

router.get('/practiceapi', ensureToken, (req, res) => {
    User.aggregate({
        $group:{
			_id:"",
			total:{$sum:'$user_id'}
		}
    }, (err, data) => {
        if (err) res.send(err);
        else res.json(data);
    });
});


module.exports = router;