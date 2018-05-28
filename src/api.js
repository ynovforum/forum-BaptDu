const express = require('express');
const app = express();

const userAPI = require('./User/UsersRoutes');

const oauthAPI = require('./Oauth/AuthRoutes');

app.use('/', oauthAPI);
app.use('/user', userAPI);

module.exports = app;