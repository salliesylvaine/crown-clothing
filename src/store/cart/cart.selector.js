import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

//generate new cart count
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

//generate new cart total
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

// A "selector function" is any function that accepts the Redux store
// state (or part of the state) as an argument, and returns data that
// is based on that state.

//generate new cart total
// const newCartTotal = cartItems.reduce(
//   (total, cartItem) => total + cartItem.quantity * cartItem.price,
//   0
// );
//generate new cart count
// const newCartCount = cartItems.reduce(
//   (total, cartItem) => total + cartItem.quantity,
//   0
// );
