const spendingCreationRules = {
  description: ['required', 'string'],
  amount: ['required', 'numeric'],
  currency: ['string', { in: ['USD', 'HUF'] }],
};

module.exports = {
  spendingCreationRules,
};
