import { entity } from 'simpler-state';

export const currencyCode = entity('all');

export const setCurrencyCode = (code) => {
  currencyCode.set(code);
};
