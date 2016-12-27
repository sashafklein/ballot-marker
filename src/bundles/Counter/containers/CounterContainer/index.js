import React from 'react';
import Counter from '@Counter/components/Counter';
import connect from './connect';

const CounterContainer = props => (
  <Counter
    value={props.counter}
    decrement={props.decrement}
    increment={props.increment}
  />
);

const { number, func } = React.PropTypes;
CounterContainer.propTypes = {
  counter: number,
  decrement: func,
  increment: func
};

export default connect(CounterContainer);
