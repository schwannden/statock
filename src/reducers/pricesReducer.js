import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function stockReducer(state = initialState.prices, action) {
  switch (action.type) {
    case type.STOCK_PRICES_SUCCESS:
      return action.prices;
    default:
      return state;
  }
};
