'use strict';

var isPlainObject = require('@fav/type.is-plain-object');
var enumOwnProps = require('@fav/prop.enum-own-props');

function assignDeep(dest /* , src, ... */) {
  if (!isPlainObject(dest)) {
    dest = {};
  }

  for (var i = 1, n = arguments.length; i < n; i++) {
    assignDeepEach(dest, arguments[i]);
  }
  return dest;
}

function assignDeepEach(dest, src) {
  var props = enumOwnProps(src);
  for (var i = 0, n = props.length; i < n; i++) {
    var prop = props[i];
    var srcValue = src[prop];

    if (isPlainObject(srcValue)) {
      var destValue = dest[prop];

      if (!isPlainObject(destValue)) {
        try {
          dest[prop] = destValue = {};
        } catch (e) {
          // If a property is read only, TypeError is thrown,
          // but this function ignore it.
        }
      }

      assignDeepEach(destValue, srcValue);
      continue;
    }

    try {
      dest[prop] = srcValue;
    } catch (e) {
      // If a property is read only, TypeError is thrown,
      // but this function ignore it.
    }
  }
}

module.exports = assignDeep;
