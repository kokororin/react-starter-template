import { CounterActions } from '@/actions';

export default function counter(state = {
    count: 0
  }, action) {
  switch (action.type) {
    case CounterActions.INCREASE:
      return {
        ...state,
        count: state.count + 1
      };

    case CounterActions.DECREASE:
      return {
        ...state,
        count: state.count - 1
      };

    default:
      return state;
  }
}
