import {combineReducers} from 'redux';
import stocks from './stocksReducer';
import prices from './pricesReducer';
import pairedPrices from './pairedPricesReducer';
import exchanges from './exchangesReducer';

const rootReducer = combineReducers({
  stocks, exchanges, prices, pairedPrices,
});

export default rootReducer;
