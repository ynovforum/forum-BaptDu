const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.render('home', {title: 'Home - Forum', user: req.user})
});

//Gestion Users
app.get('/settings', (req, res) => {
    const user = req.user;

    if(user){
        res.render('profile/settings', {title: 'Settings - Forum',title_page: 'Settings', user: req.user})
    }else{
        res.render('oauth/login')
    }
});



// Gestion de l'Auth
app.get('/login', (req, res) => {
    const user = req.user;

    if (!user) {
        res.render('oauth/login', {title: 'Mon Espace Membre - Forum'})
    } else {
        res.redirect('profile/settings')
    }
});

app.get('/register', (req, res) => {
    const user = req.user;

    if (!user) {
        res.render('oauth/register', {title: 'Nouveau client - Forum'})
    } else {
        res.redirect('profile/settings')
    }
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = app;