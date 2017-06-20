(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.treeWalkUtil = global.treeWalkUtil || {})));
}(this, (function (exports) { 'use strict';

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function treeWalkDeepInner(parent, fn, childrenKey) {
  var __stopWhenFound = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var __lv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    var ret = fn(item, i, parent, __lv);
    if (__stopWhenFound && ret !== undefined) return item;
    if (item[childrenKey]) {
      var ret2 = treeWalkDeepInner(item, fn, childrenKey, __stopWhenFound, __lv + 1);
      if (__stopWhenFound && ret2 !== undefined) return ret2;
    }
  }
}

function treeWalkDeep(parent, fn) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  treeWalkDeepInner(parent, fn, childrenKey);
}

function treeWalkParallelInner(parent, fn, childrenKey) {
  var __stopWhenFound = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var __lv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  var next = [];
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    var ret = fn(item, i, parent, __lv);
    if (__stopWhenFound && ret !== undefined) return item;
    if (item[childrenKey]) {
      next = next.concat(item[childrenKey]);
    }
  }
  if (next.length) {
    var ret2 = treeWalkParallelInner(defineProperty({}, childrenKey, next), fn, childrenKey, __stopWhenFound, __lv + 1);
    if (__stopWhenFound && ret2 !== undefined) return ret2;
  }
}

function treeWalkParallel(parent, fn) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  treeWalkParallelInner(parent, fn, childrenKey);
}

function returnInput(item) {
  return item;
}

function treeWalkDeepFind(parent, fn) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  return treeWalkDeepInner(parent, fn, childrenKey, true);
}

function treeWalkParallelFind(parent, fn) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';

  return treeWalkParallelInner(parent, fn, childrenKey, true);
}

function treeDeepToList(parent) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnInput;
  var childrenKey = arguments[2];

  var rs = [];
  treeWalkDeep(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

function treeParallelToList(parent) {
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : returnInput;
  var childrenKey = arguments[2];

  var rs = [];
  treeWalkParallel(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

function listToTree(list) {
  var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';

  var _ref;

  var pidKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pid';
  var childrenKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';

  var topLevel = [],
      // 最顶层的list
  map = {},
      // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
  mapHasChildren = {}; // 临时用于存放有子节点的item

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      map[item[idKey]] = item;

      if (item[pidKey] === null || item[pidKey] === undefined) {
        topLevel.push(item); // top level
      } else {
        if (mapHasChildren[item[pidKey]]) {
          mapHasChildren[item[pidKey]][childrenKey].push(item);
        } else {
          mapHasChildren[item[pidKey]] = defineProperty({}, childrenKey, [item]);
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var k in mapHasChildren) {
    map[k][childrenKey] = mapHasChildren[k][childrenKey]; // 把临时的放到map下
  }

  return _ref = {}, defineProperty(_ref, childrenKey, topLevel), defineProperty(_ref, 'map', map), _ref;
}

exports.treeWalkDeep = treeWalkDeep;
exports.treeWalkParallel = treeWalkParallel;
exports.treeWalkDeepFind = treeWalkDeepFind;
exports.treeWalkFind = treeWalkDeepFind;
exports.treeWalkParallelFind = treeWalkParallelFind;
exports.treeDeepToList = treeDeepToList;
exports.treeParallelToList = treeParallelToList;
exports.listToTree = listToTree;

Object.defineProperty(exports, '__esModule', { value: true });

})));
