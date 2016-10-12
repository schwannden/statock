import * as type from './actionTypes';
import Stock from '../api/stockApi';
import Exchange from '../api/exchangeApi';
import configureStore from '../store/configureStore';

export function index() {
  return function (dispatch) {
    return Stock.index().then(stocks => {
        dispatch(index_success(stocks.data));
      }).catch(error => {
        throw(error);
      });
  };
}

export function index_success(stocks) {
  return {
    type: type.STOCK_INDEX_SUCCESS,
    stocks,
  };
}

export function prices(stock_id) {
  return function (dispatch) {
    return Stock.prices(stock_id).then(prices => {
        dispatch(prices_success(prices.data));
      }).catch(error => {
        throw(error);
      });
  };
}

export function prices_success(prices) {
  return {
    type: type.STOCK_PRICES_SUCCESS,
    prices
  };
}

export function paired_prices(id) {
  return stock_id =>
    dispatch =>
      Stock.prices(stock_id).then(prices => {
        dispatch(paired_prices_success(id, prices.data));
      }).catch(error => {
        throw(error);
      });
}

export function paired_prices_success(id, prices) {
  return {
    type: type.STOCK_PAIRED_PRICES_SUCCESS,
    id,
    prices,
  };
}
