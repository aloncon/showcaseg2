import { combineReducers } from 'redux';
import products from './products_reducer';

const rootReducer = combineReducers({
  products
});

export default rootReducer;