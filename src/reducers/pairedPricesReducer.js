import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function stockReducer(state = initialState.pairedPrices, action) {
  switch (action.type) {
    case type.STOCK_PAIRED_PRICES_SUCCESS:
      let newState = [...state];
      newState[action.id] = action.prices;
      return newState;
    default:
      return state;
  }
};
