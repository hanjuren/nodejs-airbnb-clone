const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize) {
        return super.init( {
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(11),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        
    }
};