const spendingCreationRules = {
  description: ['required', 'string'],
  amount: ['required', 'numeric', { min: 0}],
  currency: ['required', 'string', { in: ['USD', 'HUF'] }],
};

module.exports = {
  spendingCreationRules,
};
