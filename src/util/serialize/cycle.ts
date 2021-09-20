/*
 Original cycle.js from https://github.com/douglascrockford/JSON-js/blob/master/cycle.js
 2021-05-31
 Public Domain.
 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 This code should be minified before deployment.
 See https://www.crockford.com/jsmin.html
 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 */

// The file uses the WeakMap feature of ES6.

/*jslint eval */

/*property
 $ref, decycle, forEach, get, indexOf, isArray, keys, length, push,
 retrocycle, set, stringify, test
 */

/* eslint-disable */

interface JSON {
  decycle(object: Record<string | number | symbol, unknown>, replacer?: Function): Record<string | number | symbol, unknown> | unknown[];

  retrocycle($: Record<string | number | symbol, unknown>): Record<string | number | symbol, unknown>;
}

if (typeof JSON.decycle !== 'function') {
  JSON.decycle = function decycle(object: Record<string | number | symbol, unknown>, replacer: Function) {
    'use strict';
    const objects = new WeakMap();     // object to path mappings

    return (function derez(value: Record<string | number | symbol, unknown>, path: string) {

      // The derez function recurses through the object, producing the deep copy.

      let old_path;   // The path of an earlier occurance of value
      let nu: Record<string | number | symbol, unknown> | unknown[];         // The new object or array

      // If a replacer function was provided, then call it to get a replacement value.

      if (replacer !== undefined) {
        value = replacer(value);
      }

      // typeof null === "object", so go on if this value is really an object but not
      // one of the weird builtin objects.

      if (
        typeof value === 'object'
        && value !== null
        && !(value instanceof Boolean)
        && !(value instanceof Date)
        && !(value instanceof Number)
        && !(value instanceof RegExp)
        && !(value instanceof String)
      ) {

        // If the value is an object or array, look to see if we have already
        // encountered it. If so, return a {"$ref":PATH} object. This uses an
        // ES6 WeakMap.

        old_path = objects.get(value);
        if (old_path !== undefined) {
          return { $ref: old_path };
        }

        // Otherwise, accumulate the unique value and its path.

        objects.set(value, path);

        // If it is an array, replicate the array.

        if (Array.isArray(value)) {
          nu = [];
          value.forEach(function (element, i) {
            nu[i] = derez(element, path + '[' + i + ']');
          });
        } else {

          // If it is an object, replicate the object.

          nu = {};
          Object.keys(value).forEach(function (name: string) {
            // @ts-ignore
            nu[name] = derez(
              // @ts-ignore
              value[name],
              path + '[' + JSON.stringify(name) + ']',
            );
          });
        }
        return nu;
      }
      return value;
    }(object, '$'));
  };
}


if (typeof JSON.retrocycle !== 'function') {
  JSON.retrocycle = function retrocycle($: Record<string | number | symbol, unknown>) {
    'use strict';

    const px = /^\$(?:\[(?:\d+|"(?:[^\\"\u0000-\u001f]|\\(?:[\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*")\])*$/;

    (function rez(value: Record<string | number | symbol, unknown>) {

      // The rez function walks recursively through the object looking for $ref
      // properties. When it finds one that has a value that is a path, then it
      // replaces the $ref object with a reference to the value that is found by
      // the path.

      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          value.forEach(function (element, i) {
            if (typeof element === 'object' && element !== null) {
              const path = element.$ref;
              if (typeof path === 'string' && px.test(path)) {
                value[i] = eval(path);
              } else {
                rez(element);
              }
            }
          });
        } else {
          Object.keys(value).forEach(function (name) {
            const item = value[name];
            if (typeof item === 'object' && item !== null) {
              // @ts-ignore
              const path = item.$ref;
              if (typeof path === 'string' && px.test(path)) {
                value[name] = eval(path);
              } else {
                rez(item as Record<string | number | symbol, unknown>);
              }
            }
          });
        }
      }
    }($));
    return $;
  };
}
