const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//connect to MongoDB
mongoose.connect('mongodb://user:movie1@ds119171.mlab.com:19171/movie', {
    useMongoClient: true
});
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log("connected to db");
});

//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// serve static files from template
app.use(express.static(__dirname + '/views'));

// include routes
const routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});


// listen on port 3000
app.listen(3000, ()=>{
    console.log('Express app listening on port 3000');
});