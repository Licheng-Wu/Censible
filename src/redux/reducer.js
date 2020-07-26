import { combineReducers } from "redux";
import { ADD_CATEGORY, REMOVE_CATEGORY, ORDER_CATEGORY } from "./actions";

const categoryReducer = (state = ["Food"], action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.payload];
    case REMOVE_CATEGORY:
      return state.filter((category) => category !== action.payload);
    case ORDER_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  category: categoryReducer,
});

export default reducer;
