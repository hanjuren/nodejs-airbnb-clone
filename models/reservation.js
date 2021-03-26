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
        
    }
};