import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function stockReducer(state = initialState.stocks, action) {
  switch (action.type) {
    case type.STOCK_INDEX_SUCCESS:
      return action.stocks;
    default:
      return state;
  }
};
