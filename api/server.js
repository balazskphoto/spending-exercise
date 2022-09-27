const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/spendings", (req, res) => {
  res.send([
    {
      description: "Mango",
      amount: 1200,
      spent_at: new Date().toISOString(),
      currency: "USD",
    },
  ]);
});

module.exports = app;