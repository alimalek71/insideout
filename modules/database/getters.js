let getLogTime = (sequilizeLogTime) => {
  if (!sequilizeLogTime) {
    let err = new Error()
    err.name = 'Invalid Model'
    err.message = 'Database Error'
    throw err
  }

  return {
    id: sequilizeLogTime.id,
    logTime: new Date(sequilizeLogTime.logTime).getTime(),
    username: sequilizeLogTime.username
  }
}

module.exports = {
  getLogTime: getLogTime
}
