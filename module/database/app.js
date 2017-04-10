let db = require('./database-init.js')

const getter = require('./getters.js')

var LogTime = require('./models/logtime')()

require('./database-sync')()

module.exports = {
  Sequelize: db.Sequelize,
  sequelize: db.sequelize,
  dataType: db.DataType,

  LogTime: LogTime,

  getter: getter
}
