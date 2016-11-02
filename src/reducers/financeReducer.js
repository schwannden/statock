import * as type from "../actions/actionTypes";
import initialState from "./initialState";

function initilizeSelector(state) {
  const exchange_id = state.exchanges[0].id;
  const filtered_stocks = state.stocks.filter(stock => (stock.exchange_id == exchange_id));
  for (let key in state.selector)
    state.selector[key] = {...state.selector[key], filtered_stocks, exchange_id, }
  return state;
}

export default function FinanceReducer(state = initialState.finance, action) {
  const {stocks, exchanges} = state;
  let new_state = Object.assign({}, state),
    selector = new_state.selector[action.store_id];
  switch (action.type) {
    case type.STOCK_INDEX_SUCCESS:
      new_state.stocks = action.stocks;
      if (exchanges.length > 0)
        initilizeSelector(new_state);
      return new_state;
    case type.EXCHANGE_INDEX_SUCCESS:
      new_state.exchanges = action.exchanges;
      if (stocks.length > 0)
        initilizeSelector(new_state);
      return new_state;
    case type.STOCK_PRICES_SUCCESS:
      const {stock, prices} = action;
      const initial = (prices.length == 0)? 0 : prices[0].close;
      const new_stock = {...stock, prices, returns: prices.map((price) => ((price.close - initial)*100/initial))};
      if (action.multiple)
        selector.selected_stocks = [...selector.selected_stocks, new_stock];
      else
        selector.selected_stocks = [new_stock];
      new_state.selector[action.store_id] = {...selector};
      return new_state;
    case type.STOCK_REMOVE:
      let new_selected_stocks = [...selector.selected_stocks];
      new_selected_stocks.splice(action.remove_index, 1);
      selector.selected_stocks = new_selected_stocks;
      new_state.selector[action.store_id] = {...selector};
      return new_state;
    case type.STOCK_FILTER:
      let {exchange_id, search_str} = action.filter_options; 
      search_str = search_str.toUpperCase();
      const filtered_stocks = stocks.filter(stock =>
        ((stock.exchange_id == exchange_id) &&
        (stock.name.toUpperCase().match(search_str) || stock.symbol.toUpperCase().match(search_str)))
      );
      new_state.selector[action.store_id] = {...selector, exchange_id, search_str, filtered_stocks,};
      return new_state;
    default:
      return state;
  }
};

