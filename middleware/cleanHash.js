const { clearHash } = require('../services/cache')

module.exports = async (req, res, next) => {
  await next()
  console.log('CLEANING HASH!!')
  clearHash(req.user.id)
}