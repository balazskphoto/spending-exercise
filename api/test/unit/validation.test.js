const Validator = require('validatorjs');

const validationRules = require('../../src/validation/rules');

describe('spendingCreationRules', () => {
  [
    {
      description: 'valid spending passes validation',
      objectToCheck: {
        description: 'A fair description',
        amount: '1000',
        currency: 'HUF',
      },
      shouldPass: true,
    },
    {
      description: 'missing amount fails validation',
      objectToCheck: {
        description: 'A fair description',
        currency: 'HUF',
      },
      shouldPass: false,
    },
    {
      description: 'missing description fails validation',
      objectToCheck: {
        amount: '1000',
        currency: 'HUF',
      },
      shouldPass: false,
    },
    {
      description: 'missing currency fails validation',
      objectToCheck: {
        amount: '1000',
        description: 'A fair description',
      },
      shouldPass: false,
    },
    {
      description: 'invalid currency fails validation',
      objectToCheck: {
        amount: '1000',
        description: 'A fair description',
        currency: 'WUF',
      },
      shouldPass: false,
    },
  ]
    .forEach(({ description, objectToCheck, shouldPass }) => {
      test(description, () => {
        const validationResult = new Validator(
          objectToCheck,
          validationRules.spendingCreationRules,
        );

        expect(validationResult.passes()).toEqual(shouldPass);
      });
    });
});
