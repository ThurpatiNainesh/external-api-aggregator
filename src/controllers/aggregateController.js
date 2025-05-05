const { fetchMockAPI } = require("../services/externalAPIs");
const cache = require("../utils/cache");

const withTimeout = (promise, timeout = 2000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeout))
  ]);
};

const aggregateData = async (req, res) => {
  const cacheKey = "aggregate-data";
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json({ ...cached, cached: true });
  }

  const apis = ["api1", "api2", "api3"];
  const results = await Promise.allSettled(
    apis.map((api) => withTimeout(fetchMockAPI(api), 2000))
  );

  const now = new Date().toISOString();
  const data = {};

  results.forEach((result, index) => {
    const apiName = apis[index];
    if (result.status === "fulfilled") {
      data[apiName] = {
        result: result.value,
        status: "success",
        timestamp: now,
      };
    } else {
      data[apiName] = {
        result: null,
        status: "failed",
        timestamp: now,
      };
    }
  });

  const expiresAt = new Date(Date.now() + 600000).toISOString();
  const response = { data, cached: false, expiresAt };
  cache.set(cacheKey, response);
  res.json(response);
};

module.exports = { aggregateData };