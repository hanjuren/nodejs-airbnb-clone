const Sequelize = require('sequelize');

module.exports = class Favorite extends Sequelize.Model{
    static init(sequelize) {
        return super.init( {
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Favorite',
            tableName: 'favorites',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Favorite.belongsTo(db.User);
        db.Favorite.belongsTo(db.Host);
    }
};