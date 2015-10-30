import { combineReducers } from 'redux';
import { REQUEST_PAGES, RECEIVE_PAGES } from '../actions/actions.js';

function pages(state = {}, action) {
  switch(action.type) {

    case REQUEST_PAGES:
      return Object.assign({}, state, {
        isFetching : true
      });

    case RECEIVE_PAGES:
      return Object.assign({}, state, {
        isFetching : false,
        pages : action.pages
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  pages
});

export default rootReducer;
