import { FETCH_PRODUCTS } from '../actions/types';

export default function(state = [], action) {
  //console.log("reducer rrrrrrrrrrrrrrrrrr ");
  //console.log(action.payload);
  switch (action.type) {
    case FETCH_PRODUCTS:
      //return action.payload.data;
      return action.payload.cdw;
    default:
      return state;
  }
}