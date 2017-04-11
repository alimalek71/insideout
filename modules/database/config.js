let config = {}
config.app_dirname = __dirname

config.db = 'insideout'
config.username = 'root'
config.password = 'root'

config.sequelize = {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
}

module.exports = config
