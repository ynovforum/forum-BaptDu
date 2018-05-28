const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cfg = require('./config/tsconfig');
const helmet = require('helmet');

const COOKIE_SECRET = 'cookie secret';

const APIPoint = require('./src/api');

app.use(helmet());
app.use(helmet.hidePoweredBy('hide-powered-by'));
app.use(helmet.noCache());
app.use(helmet.frameguard());


// BodyParser Setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cookieParser(COOKIE_SECRET));

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({

        });
    }
    next();
});

app.get('/api/', (req, res, next) => {
    res.json({
        Name: cfg.project.name,
        Description: cfg.project.description,
        Github: cfg.project.url
    })
});

// Routes API
app.use(APIPoint);

app.use((req, res, next) => {
    const error = new Error('404');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;