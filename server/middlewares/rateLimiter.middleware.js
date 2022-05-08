const Redis = require("ioredis");

const redis = new Redis();

async function rateLimiter(req, res, next) {
  const ip = req.ip;

  const count = await redis.incr(ip);

  await redis.expire(ip, 2);

  if (count > 10) {
    res.status(503).send("access denied");
    return;
  }

  next();
}

module.exports = { rateLimiter };
