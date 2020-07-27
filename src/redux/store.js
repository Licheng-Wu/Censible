import reducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import AsyncStorage from "@react-native-community/async-storage";

const preloadedState = {
  category: [
    "Food",
    "Transport",
    "Education",
    "Entertainment",
    "Sports",
    "Others",
  ],
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  preloadedState,
  applyMiddleware(createLogger())
);

export const persistor = persistStore(store);
