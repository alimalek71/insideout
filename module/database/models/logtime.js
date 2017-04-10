let config = require('../config.js');
let db = require('../database-init.js');

module.exports = () => {
    return db.sequelize.define('logtime', {
        deviceUid: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        logTime: {
            type: db.Sequelize.DATE,
            allowNull: false
        }
    }, {
            paranoid: true,
            charset: 'utf8'
        });
}