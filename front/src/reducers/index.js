import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import news from './news';

export default combineReducers({
  routing: routerReducer,
  news,
});
