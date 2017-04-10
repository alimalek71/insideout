let getLogTime = (sequilizeLogTime) => {
  if (sequilizeLogTime) {
    let err = new Error()
    err.name = 'Invalid Model'
    err.message = 'Call Administrator :)'
  }
}

module.exports = {
  getLogTime: getLogTime
}
