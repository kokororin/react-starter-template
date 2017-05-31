import createTypes from 'namespaced-types';

export const types = createTypes('counter', [
  'INCREASE',
  'DECREASE'
]);

export function increase() {
  return {
    type: types.INCREASE
  };
}

export function decrease() {
  return {
    type: types.DECREASE
  };
}
