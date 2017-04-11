let getLogTime = (sequilizeLogTime) => {
  if (!sequilizeLogTime) {
    let err = new Error()
    err.name = 'Invalid Model'
    err.message = 'Database Error'
    throw err
  }

  return {
    logTime: sequilizeLogTime.logTime,
    username: sequilizeLogTime.username
  }
}

module.exports = {
  getLogTime: getLogTime
}
