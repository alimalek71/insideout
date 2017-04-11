let config = require('./config.js')

let cls = require('continuation-local-storage')
let namespace = cls.createNamespace('mobillet-defualt-namespace')

let Sequelize = require('sequelize')
Sequelize.cls = namespace

let sequelize = new Sequelize(config.db, config.username, config.password, config.sequelize)

module.exports = {
  Sequelize: Sequelize,
  DataType: Sequelize,
  sequelize: sequelize
}
