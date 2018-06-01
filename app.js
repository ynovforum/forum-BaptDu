const express = require('express');
const app = express();
const FroalaEditor = require('path/to/lib/froalaEditor.js');

const {twig} = require( 'twig' );

const APIPoint = require('./src/api');

const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = 'cookie secret';

require('./app/config/passport');

app.set('view engine', 'twig');

app.set('twig options', {
    strict_variables: false
});

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

app.listen(process.env.SRV_PORT);