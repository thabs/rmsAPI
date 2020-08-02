const redis = require('redis');
const {promisify} = require('util');

//! Configs
const keys = require('../configs/keys');

const redisClient =
  process.env.NODE_ENV === 'production'
    ? redis.createClient(keys.REDIS_URL)
    : redis.createClient();

redisClient.get = promisify(redisClient.get);

module.exports.setCache = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};

module.exports.getCache = async (key) => {
  const cache = await redisClient.get(key);
  if (cache) {
    const value = JSON.parse(cache);
    return value;
  }

  return null;
};
