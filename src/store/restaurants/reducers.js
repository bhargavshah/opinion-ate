import {combineReducers} from 'redux';
import {
  START_LOADING,
  STORE_RESTAURANTS,
  LOADING_FAILED,
  ADD_RESTAURANT,
} from './actions';

const records = (state = [], action) => {
  switch (action.type) {
    case STORE_RESTAURANTS:
      return action.records;
    case ADD_RESTAURANT:
      return [...state, action.record];
    default:
      return state;
  }
};

const loading = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true;
    case STORE_RESTAURANTS:
    case LOADING_FAILED:
      return false;
    default:
      return state;
  }
};

const error = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return false;
    case STORE_RESTAURANTS:
      return false;
    case LOADING_FAILED:
      return true;
    default:
      return state;
  }
};

export default combineReducers({records, loading, error});
