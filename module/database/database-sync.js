let db = require('./database-init.js')
// let models = require('./app')

module.exports = () => {
  db.sequelize.sync({}).then(() => console.log('db created'))
}
