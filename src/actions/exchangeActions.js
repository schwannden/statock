import * as type from './actionTypes';
import Exchange from '../api/exchangeApi';

export function index() {
  return function (dispatch) {
    return Exchange.index().then(exchanges => {
        dispatch(index_success(exchanges.data))
      }).catch(error => {
        throw(error);
      });
  };
}

export function index_success(exchanges) {
  return {
    type: type.EXCHANGE_INDEX_SUCCESS,
    exchanges
  };
}

