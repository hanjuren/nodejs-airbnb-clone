const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Host = require('./host');
const Image = require('./image');
const Reservation = require('./reservation');

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config, config.timezone,
);

db.sequelize = sequelize;
db.User = User;
db.Host = Host;
db.Image = Image;
db.Reservation = Reservation;

User.init(sequelize);
Host.init(sequelize);
Image.init(sequelize);
Reservation.init(sequelize);

User.associate(db);
Host.associate(db);
Image.associate(db);
Reservation.associate(db);

module.exports = db;