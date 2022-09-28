/**
 * @jest-environment node
 */
import nock from 'nock';

import SpendingsAPI from '../../src/apis/spendingsAPI';

describe('SpendingsAPI', () => {
  const spendingList = [
    {
      id: 1,
      description: 'Spending',
      amount: 5,
      currency: 'HUF',
    },
  ];

  describe('GET /spendings', () => {
    it('gets spendings without query params', async () => {
      nock('http://localhost:5001')
        .get('/spendings')
        .reply(200, spendingList);

      const response = await SpendingsAPI.get();
      expect(response).toEqual(spendingList);
    });

    it('gets spendings without query params', async () => {
      nock('http://localhost:5001')
        .get('/spendings')
        .query({ currency: 'HUF' })
        .reply(200, spendingList);

      const response = await SpendingsAPI.get({
        currency: 'HUF',
      });
      expect(response).toEqual(spendingList);
    });
  });

  describe('POST /spending', () => {
    it('posts a new spending', async () => {
      nock('http://localhost:5001')
        .post('/spending')
        .reply(201, spendingList[0]);

      const response = await SpendingsAPI.create({
        ...spendingList[0],
        id: undefined,
      });
      expect(response).toEqual(spendingList[0]);
    });
  });
});
