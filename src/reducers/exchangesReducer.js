import * as type from "../actions/actionTypes";
import initialState from "./initialState";

export default function stockReducer(state = initialState.exchanges, action) {
  switch (action.type) {
    case type.EXCHANGE_INDEX_SUCCESS:
      return action.exchanges;
    default:
      return state;
  }
};
