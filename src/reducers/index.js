import { combineReducers } from 'redux';

import counter from '@/reducers/counter';

const reducers = combineReducers({
  counter
});

export default reducers;
