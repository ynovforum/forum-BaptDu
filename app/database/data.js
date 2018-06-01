const Sequelize = require('Sequelize');
const UserModel = require('../../src/User/UserModel');
const QuestionModel = require('../../src/Question/QuestionModel');
const CommentModel = require('../../src/Comment/CommentModel');

const database = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const User = UserModel(database, Sequelize);
const Question = QuestionModel(database, Sequelize);
const Comment = CommentModel(database, Sequelize);

Question.belongsTo(User);
User.hasMany(Question);

Comment.belongsTo(Question);
Question.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created`);
    });

module.exports = {
    User,
    Question,
    Comment,
};