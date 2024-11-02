import { createSelector } from 'reselect';
import { RootState } from '..';

// safe won't cause re-render
export const selectCartItems = (state: RootState) => state.cart.items;

// not safe will cause re-render
export const selectCartItemNames = (state: RootState) => {
  return state.cart.items.map((item) => item.name);
};

// safe won't cause rerender since we memoized it
export const selectCartItemNamesMemoized = createSelector(
  [selectCartItems],
  (items) => {
    return items.map((item) => item.name);
  }
);

// safe won't cause re-render since it's a primitive value
export const selectTotalItemQuantity = (state: RootState) => {
  return state.cart.items.reduce((total, item) => total + item.qty, 0);
};

// safe won't cause rerender since we memoized it
export const selectTotalItemQuantityMemoized = createSelector(
  [selectCartItems],
  (items) => {
    return items.reduce((total, item) => total + item.qty, 0);
  }
);

// safe won't cause re-render since it's a primitive value
export const selectTotalUniqueItems = (state: RootState) => {
  return state.cart.items.length;
};

export const selectFilterThreshold = (state: RootState) =>
  state.cart.filterThreshold;

// safe won't cause re-render since we memoized it
export const selectFilteredCartItems = createSelector(
  [selectCartItems, selectFilterThreshold],
  (items, filterThreshold) => {
    return items.filter((item) => item.qty >= filterThreshold);
  }
);
