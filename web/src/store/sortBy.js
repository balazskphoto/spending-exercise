import { entity } from 'simpler-state';

export const sortBy = entity('-createdAt');

export const setSortBy = (field) => {
  sortBy.set(field);
};
