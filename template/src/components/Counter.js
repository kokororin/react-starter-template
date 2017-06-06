import '@/styles/Counter.scss';

import React from 'react';

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'counter'}>
        <button className={'btn btn-increase'} onClick={this.props.onIncrement}>
          +
        </button>
        <h1>{this.props.value}</h1>
        <button className={'btn btn-decrease'} onClick={this.props.onDecrement}>
          -
        </button>
      </div>
    );
  }
}
