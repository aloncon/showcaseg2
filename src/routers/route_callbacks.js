import store from '../store';
import { fetchProducts } from '../actions';

//console.log("ssssss dispatch fetchp.....");

export function onProductsEnter() {
  //console.log("ssssss iiiiiiiiiiiiiiiiiiiiiiiiinside  dispatch fetchp.....");
  store.dispatch(fetchProducts());
}
