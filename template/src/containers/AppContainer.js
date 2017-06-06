import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import 'classlist-polyfill';

import { configureStore, history } from '@/stores';
import { CounterContainer } from '@/containers';

const store = configureStore();

@autobind
export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path={'/'} component={CounterContainer} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
