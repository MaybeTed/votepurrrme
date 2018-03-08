import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import catsReducer from './cats_reducer';

const reducer = combineReducers({
  auth: authReducer,
  cats: catsReducer
});

export default reducer;
