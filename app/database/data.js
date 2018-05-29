const Sequelize = require('Sequelize');
const UserModel = require('../../src/User/UserModel');
const QuestionModel = require('../../src/Question/QuestionModel');

const database = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const User = UserModel(database, Sequelize);
const Question = QuestionModel(database, Sequelize);

Question.belongsTo(User);
User.hasMany(Question);

database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created`);
    });

module.exports = {
    User,
    Question,
};