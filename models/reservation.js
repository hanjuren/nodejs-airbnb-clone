const Sequelize = require('sequelize');

module.exports = class Reservation extends Sequelize.Model{
    static init(sequelize) {
        return super.init( {
            checkIn: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            checkout: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            reservationUserName: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            reservationPhone: {
                type: Sequelize.STRING(20),
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Reservation',
            tableName: 'reservations',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Reservation.belongsTo(db.User);
        db.Reservation.belongsTo(db.Host);
        db.Reservation.hasMany(db.Review);
    }
};