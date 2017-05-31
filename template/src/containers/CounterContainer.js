import React from 'react';
import { connect } from 'react-redux';

import { Counter } from '@/components';
import { CounterActions } from '@/actions';

class CounterContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Counter
        value={ this.props.counter.count }
        onIncrement={ () => this.props.dispatch(CounterActions.increase()) }
        onDecrement={ () => this.props.dispatch(CounterActions.decrease()) } />
    );
  }
}

export default connect((state) => {
  return {
    counter: state.counter
  }
})(CounterContainer);

