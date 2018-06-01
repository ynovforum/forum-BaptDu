const express = require('express');
const app = express();

const AuthUsers = require('./PassRoute/UserPR');
const AuthAdmins = require('./PassRoute/AdminPR');

const userAPI = require('./User/UserRoutes');
const questionAPI = require('./Question/QuestionRoutes');
const oauthAPI = require('./Oauth/AuthRoutes');

app.use('/oauth', oauthAPI);
app.use(userAPI);
app.use(questionAPI);

module.exports = app;