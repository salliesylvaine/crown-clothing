import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// this is saying if the categories array does not change, do not run the categories.reduce method

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

// A "selector function" is any function that accepts the Redux store
// state (or part of the state) as an argument, and returns data that
// is based on that state.
