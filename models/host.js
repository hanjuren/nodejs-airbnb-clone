const Sequelize = require('sequelize');

module.exports = class Host extends Sequelize.Model{
    static init(sequelize) {
        return super.init( {
            title: {
                type: Sequelize.STRING(40),
                allowNull: false,
            },
            hostaddress: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            person: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            roominfo: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            hostinfo: {
                type: Sequelize.STRING(300),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Host',
            tableName: 'hosts',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db,Host.hasMany(db.Image);
    }
};