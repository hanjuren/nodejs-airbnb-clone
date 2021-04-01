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
                type: Sequelize.STRING(1500),
                allowNull: false,
            },
            hosttype: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Host',
            tableName: 'hosts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Host.hasMany(db.Image);
        db.Host.belongsTo(db.User);
        db.Host.hasMany(db.Reservation);
    }
};