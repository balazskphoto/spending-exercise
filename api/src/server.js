const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const statusCodes = require("http-status-codes");
const { PrismaClient } = require("@prisma/client");
let Validator = require('validatorjs');
const validationRules = require("./validation/rules.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/spendings", async (req, res) => {
  const prisma = new PrismaClient()

  const orderBy = req.query.orderBy;
  const ascending = req.query.ascending;
  const currencyFilter = req.query.currency;

  const spendings = await prisma.spending.findMany({
    where: currencyFilter ? { currency: { code: currencyFilter} } : undefined,
    orderBy: orderBy ? { [orderBy]: ascending ? 'asc': 'desc'} : undefined,
  });

  res.send(spendings.map((dbSpending) => ({
    description: dbSpending.description,
    currency: dbSpending.currencyCode,
    amount: dbSpending.amount,
    spent_at: dbSpending.createdAt,
  })));
});

app.post("/spending", async (req, res) => {
  const spending =  req.body;
  const validation = new Validator(spending, validationRules.spendingCreationRules);

  if (validation.fails()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Spending didn't pass validation"
    });
  }

  const prisma = new PrismaClient();

  await prisma.spending.create(
    {
      data: {
        description: spending.description,
        currency: {
          connect: {
            code: spending.currency,
          },
        },
        amount: spending.amount,
      }
    });

  return res.status(statusCodes.CREATED).send();
});

module.exports = app;