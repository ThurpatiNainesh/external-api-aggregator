const fetchMockAPI = (name) => {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * 1000 + 500);
      const fail = Math.random() < 0.3;
      setTimeout(() => {
        if (fail) return reject(new Error(`${name} failed`));
        return resolve({ name, data: `${name} result` });
      }, delay);
    });
  };
  
  module.exports = { fetchMockAPI };