'use strict';
var nativeBind = Function.prototype.bind;
var slice = Array.prototype.slice;

/** Create a function bound to a given object (assigning `this`, and arguments,
 * optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
 * available.
 *
 * @param {Function} func - The function to transform.
 * @param {*} context - The `this` to which the function will be bound.
 * @param {...*} args - The arguments which will be prepended to the function.
 * @returns {Function} - The transformed function.
 **/
function bind(func, context) {
  if (nativeBind && func.bind === nativeBind) {
    return nativeBind.apply(func, slice.call(arguments, 1));
  }
  if (typeof func !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  var args = slice.call(arguments, 2);
  function bound() {
    return func.apply(context, args.concat(slice.call(arguments)));
  }
  return bound;
}

module.exports = bind;
