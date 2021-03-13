const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Host = require('./host');
const Image = require('./image');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Host = Host;
db.Image = Image;

User.init(sequelize);
Host.init(sequelize);
Image.init(sequelize);

User.associate(db);
Host.associate(db);
Image.associate(db);

module.exports = db;