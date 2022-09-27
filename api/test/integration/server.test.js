const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const statusCodes = require('http-status-codes');

const server = require('../../src/server');

describe('GET /spendings', () => {
  const prisma = new PrismaClient();

  const clearDB = async () => {
    const deleteSpendings = prisma.spending.deleteMany();
    const deletCurrencies = prisma.currency.deleteMany();

    await prisma.$transaction([
      deleteSpendings,
      deletCurrencies,
    ]);

    await prisma.$disconnect();
  };

  beforeAll(async () => {
    await clearDB();
    await prisma.currency.createMany({
      data: [{
        code: 'USD',
        description: 'US Dollar',
      },
      {
        code: 'HUF',
        description: 'Hungarian Forint',
      }],
    });

    await prisma.spending.createMany({
      data: [
        {
          description: 'Test spending',
          currencyCode: 'HUF',
          amount: 100,
        },
        {
          description: 'Another test spending',
          currencyCode: 'USD',
          amount: 200,
        },
      ],
    });
  });

  afterAll(clearDB);

  const usdSpending = {
    id: expect.any(Number),
    amount: 200,
    currency: 'USD',
    description: 'Another test spending',
    spent_at: expect.any(String),
  };
  const hufSpending = {
    id: expect.any(Number),
    amount: 100,
    currency: 'HUF',
    description: 'Test spending',
    spent_at: expect.any(String),
  };

  test('returns all spendings', async () => {
    const response = await request(server)
      .get('/spendings');

    expect(response.statusCode).toEqual(statusCodes.OK);
    expect(response.body).toEqual(
      [hufSpending, usdSpending],
    );
  });

  test('filters currency', async () => {
    const response = await request(server)
      .get('/spendings')
      .query({ currency: 'HUF' });

    expect(response.statusCode).toEqual(statusCodes.OK);
    expect(response.body).toEqual(
      [hufSpending],
    );
  });

  test('sorts results', async () => {
    const response = await request(server)
      .get('/spendings')
      .query({ orderBy: 'amount' });

    expect(response.statusCode).toEqual(statusCodes.OK);
    expect(response.body).toEqual(
      [usdSpending, hufSpending],
    );
  });

  test('sorts results in ascending order', async () => {
    const response = await request(server)
      .get('/spendings')
      .query({ orderBy: 'amount', ascending: true });

    expect(response.statusCode).toEqual(statusCodes.OK);
    expect(response.body).toEqual(
      [hufSpending, usdSpending],
    );
  });
});

describe('POST /spending', () => {
  const prisma = new PrismaClient();

  beforeAll(async () => {
    await prisma.currency.createMany({
      data: [{
        code: 'USD',
        description: 'US Dollar',
      },
      {
        code: 'HUF',
        description: 'Hungarian Forint',
      }],
    });
  });

  afterEach(async () => {
    await prisma.spending.deleteMany();
    await prisma.$disconnect();
  });

  afterAll(async () => {
    const deleteSpendings = prisma.spending.deleteMany();
    const deletCurrencies = prisma.currency.deleteMany();

    await prisma.$transaction([
      deleteSpendings,
      deletCurrencies,
    ]);

    await prisma.$disconnect();
  });

  test('creates a new spending', async () => {
    const response = await request(server)
      .post('/spending')
      .send({
        description: 'Created spending',
        currency: 'USD',
        amount: 500.5,
      });

    expect(response.statusCode).toEqual(statusCodes.CREATED);
    expect(response.body).toEqual(
      {
        id: expect.any(Number),
        amount: 500.5,
        currency: 'USD',
        description: 'Created spending',
        spent_at: expect.any(String),
      },
    );
    expect(await prisma.spending.findMany()).toEqual(
      [
        {
          id: expect.any(Number),
          currencyCode: 'USD',
          amount: expect.any(Object),
          description: 'Created spending',
          createdAt: expect.any(Date),
        }],
    );
  });

  test('validates currency', async () => {
    const response = await request(server)
      .post('/spending')
      .send({
        description: 'Created spending',
        currency: 'UNSUPPORTED',
        amount: 500.5,
      });

    expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    expect(response.body).toEqual(
      {
        message: "Spending didn't pass validation",
      },
    );
  });

  test('validates required fields', async () => {
    const response = await request(server)
      .post('/spending')
      .send({
        currency: 'UNSUPPORTED',
        amount: 500.5,
      });

    expect(response.statusCode).toEqual(statusCodes.BAD_REQUEST);
    expect(response.body).toEqual(
      {
        message: "Spending didn't pass validation",
      },
    );
  });
});
