const Sequelize = require('Sequelize');
const UserModel = require('../src/User/UserModel');

const database = new Sequelize('forum', 'root', '', {
    host: 'localhost',
    password: null,
    dialect: 'mysql'
});

const User = UserModel(database, Sequelize);

database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created`);
    });

module.exports = {
    User,
};