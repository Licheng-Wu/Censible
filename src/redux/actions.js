export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const ORDER_CATEGORY = "ORDER_CATEGORY"

// Action creator
export const addCategory = (newCategory) => ({
  type: ADD_CATEGORY,
  payload: newCategory,
});

export const removeCategory = (oldCategory) => ({
  type: REMOVE_CATEGORY,
  payload: oldCategory,
});

export const orderCategory = (orderedList) => ({
  type: ORDER_CATEGORY,
  payload: orderedList
});