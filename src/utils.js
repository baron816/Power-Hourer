import * as selectors from './selectors';
import * as actions from './actions';
import { compose } from 'redux';

export function makeProps(selectors) {
  return function (state, ownProps) {
    return Object.keys(selectors).reduce(function(acc, key) {
      acc[key] = selectors[key](state, ownProps);
      return acc;
    }, {});
  };
}

export function dismember(struct, method) {
  return require('immutable')[capitalizeFirstLetter(struct)].prototype[method];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function caller(fn) {
  return function (...args) {
    return function (state) {
      return fn.call(state, ...args);
    };
  };
}

function curry(fn) {
  var arity = fn.length;

  return (function resolve(...prevArgs){
    return function(...newArgs){
      var currArgs = [...prevArgs, ...newArgs];

      if (arity - currArgs.length <= 0) {
        return fn(...currArgs);
      } else {
        return resolve(...currArgs);
      }
    };
  }());
}

export function pick(obj, list) {
  return list.reduce(function(acc, curr) {
    var val = obj[curr];
    if (val !== undefined) {
      acc[curr] = val;
      return acc;
    } else {
      throw Error('Key does not exist: ' + curr);
    }
  }, {});
}

const picks = curry(pick);
const pickSelectors = picks(selectors);

export const makePropsFromActions = picks(actions);

export const makePropsFromSelectors = compose(makeProps, pickSelectors);
