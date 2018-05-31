const express = require('express');
const request = require('request');
const app = express();


//Gestion Users
app.get('/settings', (req, res) => {
    const user = req.user;

    if (user) {
        res.render('profile/settings', {title: 'Settings - Forum', user: req.user})
    } else {
        res.render('oauth/login')
    }
});


// Gestion de l'Auth

app.get('/register', (req, res) => {
    const user = req.user;

    if (!user) {
        res.render('oauth/register', {title: 'Nouveau dist - Forum'})
    } else {
        res.redirect('profile/settings')
    }
});

module.exports = app;