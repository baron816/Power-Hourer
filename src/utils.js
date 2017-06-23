export function makeProps(selectors) {
  return function (state, ownProps) {
    return Object.keys(selectors).reduce(function(acc, key) {
      acc[key] = selectors[key](state, ownProps);
      return acc;
    }, {});
  };
}

export function dispatchAll(dispatch, ...actions) {
  return function (...args) {
    for (const action of actions) {
      if (Array.isArray(action)) {
        dispatchAll(dispatch, ...action)(...args);
      } else if (typeof action === 'function') {
        dispatch(action(...args));
      } else if (typeof action === 'object') {
        dispatch(action);
      }
    }
  };
}

export function dismember(struct, method) {
  return require('immutable')[capitalizeFirstLetter(struct)].prototype[method];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function composer(fn) {
  return function (...args) {
    return function (state) {
      return fn.call(state, ...args);
    };
  };
}
