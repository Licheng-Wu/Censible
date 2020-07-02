export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";

// Action creator
export const addCategory = (newCategory) => ({
  type: ADD_CATEGORY,
  payload: newCategory,
});

export const removeCategory = (oldCategory) => ({
  type: REMOVE_CATEGORY,
  payload: oldCategory,
});
