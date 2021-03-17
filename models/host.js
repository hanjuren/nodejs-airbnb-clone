const Sequelize = require('sequelize');

module.exports = class Host extends Sequelize.Model{
    static init(sequelize) {
        return super.init( {
            title: {
                type: Sequelize.STRING(100),
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
            roominfo_room: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            roominfo_bed: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            roominfo_cook: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            roominfo_bathroom: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            hostinfo: {
                type: Sequelize.STRING(500),
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
        db.Host.hasMany(db.Image);
    }
};