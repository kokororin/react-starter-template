import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '@/reducers';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {

  let store;
  if (process.env.NODE_ENV === 'production') {
    store = createStoreWithMiddleware(rootReducer, initialState);
  } else {
    store = createStoreWithMiddleware(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@/reducers', () => {
      const nextRootReducer = require('@/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
