const express = require("express");
const { aggregateData } = require("./controllers/aggregateController");
const app = express();

app.get("/aggregate-data", aggregateData);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
