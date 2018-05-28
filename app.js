const express = require('express');
const app = express();

const APIPoint = require('./src/api');
const APIView = require('./website');

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = 'cookie secret';

require('./config/passport');

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(cookieParser(COOKIE_SECRET));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(APIPoint);
app.use(APIView);

module.exports = app;