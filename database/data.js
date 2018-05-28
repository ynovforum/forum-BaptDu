const Sequelize = require('sequelize');
const cfg = require('../config/tsconfig.json');
const UserModel = require('../src/Users/UserModel');



const database = new Sequelize(cfg.db.name, cfg.db.user, cfg.db.password, {
    host: cfg.db.host,
    dialect: cfg.db.type
});

const Users = UserModel(database, Sequelize);



database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created`);
    });

module.exports = {
       Users,
};