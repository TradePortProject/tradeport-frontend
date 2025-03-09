import { combineReducers } from "redux";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
