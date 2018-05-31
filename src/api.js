const express = require('express');
const app = express();

const userAPI = require('./User/UserRoutes');
const questionAPI = require('./Question/QuestionRoutes');
const oauthAPI = require('./Oauth/AuthRoutes');

app.use('/oauth', oauthAPI);
app.use('/user', userAPI);
app.use(questionAPI);

module.exports = app;