const spendingCreationRules = {
  description: ['required', 'string'],
  amount: ['required', 'numeric'],
  currency: ['required', 'string', { in: ['USD', 'HUF'] }],
};

module.exports = {
  spendingCreationRules,
};
