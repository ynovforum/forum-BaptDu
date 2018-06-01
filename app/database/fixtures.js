module.exports = (database) => {
    database.sync()
        .then(() => User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        }))
        .then(() => User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        }))
};