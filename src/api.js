const express = require('express');
const app = express();

const UserAPI = require('./Users/UserRoutes');
const oauthAPI = require('./Oauth/AuthRoutes');

app.use('/api/user', UserAPI);
app.use('/api/oauth/', oauthAPI);

module.exports = app;