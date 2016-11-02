import * as type from './actionTypes';
import Stock from '../api/stockApi';
import Exchange from '../api/exchangeApi';
import configureStore from '../store/configureStore';

export default class StockActions {
  constructor(store_id, multiple) {
    this.store_id = store_id;
    this.multiple = multiple;
  }

  static index() {
    return function (dispatch) {
      return Stock.index().then(stocks => {
          dispatch(StockActions.indexSuccess(stocks.data));
        }).catch(error => {
          throw(error);
        });
    };
  }

  static indexSuccess(stocks) {
    return {
      type: type.STOCK_INDEX_SUCCESS,
      stocks,
    };
  }

  prices(stock) {
    const pricesSuccess = this.pricesSuccess.bind(this);
    return function (dispatch) {
      return Stock.prices(stock.id).then(prices => {
          dispatch(pricesSuccess(stock, prices.data));
        }).catch(error => {
          throw(error);
        });
    };
  }

  pricesSuccess(stock, prices) {
    const {store_id, multiple} = this;
    return {
      type: type.STOCK_PRICES_SUCCESS,
      store_id,
      multiple,
      stock,
      prices,
    };
  }

  remove(remove_index) {
    const {store_id} = this;
    return {
      type: type.STOCK_REMOVE,
      store_id,
      remove_index,
    };
  }

  filter(filter_options) {
    const {store_id, multiple} = this;
    return {
      type: type.STOCK_FILTER,
      store_id,
      multiple,
      filter_options,
    };
  }
}
