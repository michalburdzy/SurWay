const mongoose = require('mongoose');
const { exec } = mongoose.Query.prototype
const redis = require('redis')
const { promisify } = require('util');
const { redisKey } = require('../controllers/config/keys')

const client = redis.createClient(redisKey);
client.hget = promisify(client.hget)

mongoose.Query.prototype.cacheQuery = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '')
  return this;
}

mongoose.Query.prototype.exec = async function () {

  if (!this.useCache) {
    return exec.apply(this, arguments)
  }

  const mongoQuery = this.getQuery()
  const model = this.model
  const collection = this.mongooseCollection.name
  const cacheQuery = JSON.stringify({ ...mongoQuery, collection })

  const cacheValue = await client.hget(this.hashKey, cacheQuery);

  if (cacheValue) {
    const returnedValue = JSON.parse(cacheValue)
    Array.isArray(returnedValue)
    if (Array.isArray(returnedValue)) {
      const models = returnedValue.map(el => new model(el))
      return models;
    }
    const result = new model(returnedValue)
    return result;
  }

  const res = await exec.apply(this, arguments);

  client.hset(this.hashKey, cacheQuery, JSON.stringify(res))
  client.expire(this.hashKey, 60)
  return res;
}

module.exports = {
  clearHash(key) {
    client.del(JSON.stringify(key))
  }
}