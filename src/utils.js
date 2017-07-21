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

export function composer(fn) {
  return function (...args) {
    return function (state) {
      return fn.call(state, ...args);
    };
  };
}
