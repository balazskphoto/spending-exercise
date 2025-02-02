const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const statusCodes = require('http-status-codes');
const { PrismaClient } = require('@prisma/client');
const Validator = require('validatorjs');

const validationRules = require('./validation/rules');

const prisma = new PrismaClient();

const mapDBSpending = (dbSpending) => ({
  id: dbSpending.id,
  description: dbSpending.description,
  currency: dbSpending.currencyCode,
  amount: parseFloat(dbSpending.amount),
  spent_at: dbSpending.createdAt,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/spendings', async (req, res) => {
  const { orderBy, ascending, currency } = req.query;

  const spendings = await prisma.spending.findMany({
    where: currency ? { currency: { code: currency } } : undefined,
    orderBy: orderBy ? { [orderBy]: ascending ? 'asc' : 'desc' } : undefined,
  });

  res.send(spendings.map(mapDBSpending));
});

app.post('/spending', async (req, res) => {
  const spending = req.body;
  const validation = new Validator(spending, validationRules.spendingCreationRules);

  if (validation.fails()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      message: "Spending didn't pass validation",
    });
  }

  const createdEntry = await prisma.spending.create(
    {
      data: {
        description: spending.description,
        currency: {
          connect: {
            code: spending.currency,
          },
        },
        amount: spending.amount,
      },
    },
  );

  return res.status(statusCodes.CREATED).send(mapDBSpending(createdEntry));
});

module.exports = app;
