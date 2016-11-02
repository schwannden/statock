import {combineReducers} from 'redux';
import finance from './financeReducer';

const rootReducer = combineReducers({
  finance,
});

export default rootReducer;
