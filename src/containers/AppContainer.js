import React from 'react';
import { Locations, Location } from 'react-router-component';
import { Provider } from 'react-redux';
import 'classlist-polyfill';

import configureStore from '@/stores';
import { CounterContainer } from '@/containers';

const store = configureStore();

@autobind
export default class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.onNavigation();
  }

  onNavigation() {
    // hook
  }

  render() {
    return (
      <Provider store={ store }>
        <Locations onNavigation={ this.onNavigation }>
          <Location
            path={ '/' }
            handler={ CounterContainer } />
        </Locations>
      </Provider>
    );
  }

}
