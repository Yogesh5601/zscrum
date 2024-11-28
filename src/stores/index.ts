import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import generalReducer from "./reducers/generalReducer"

const rootReducer = combineReducers({
  generals: generalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;