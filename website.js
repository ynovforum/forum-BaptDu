const express = require('express');
const app = express();
const APICfg = require('./app');

// Use Pug to render views
app.set("twig options", {
    strict_variables: false
});
// Serve assets from the public folder
app.use(express.static('public'));

// Route API Config
app.use(APICfg);

app.get('/', function(req, res){
    res.render('index.twig', {
        message : "Hello World"
    });
});

app.get('/profile', function(req, res){
    res.render('profile/profile.twig', {
        message : "Jean"
    });
});

module.exports = app;