'use strict';

var babelHelpers = {};

babelHelpers.defineProperty = function (obj, key, value) {
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

babelHelpers;

function treeWalkDeepInner(parent, fn, childrenKey, __lv) {
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv);
    if (item[childrenKey]) {
      treeWalkDeepInner(item, fn, childrenKey, __lv + 1);
    }
  }
}

function treeWalkDeep(parent, fn) {
  var childrenKey = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];

  treeWalkDeepInner(parent, fn, childrenKey, 0);
}

function treeWalkParallelInner(parent, fn, childrenKey, __lv) {
  var next = [];
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv);
    if (item[childrenKey]) {
      next = next.concat(item[childrenKey]);
    }
  }
  if (next.length) {
    treeWalkParallelInner(babelHelpers.defineProperty({}, childrenKey, next), fn, childrenKey, __lv + 1);
  }
}

function treeWalkParallel(parent, fn) {
  var childrenKey = arguments.length <= 2 || arguments[2] === undefined ? 'children' : arguments[2];

  treeWalkParallelInner(parent, fn, childrenKey, 0);
}

function mapTreeDeep(parent, fn, childrenKey) {
  var rs = [];
  treeWalkDeep(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

function mapTreeParallel(parent, fn, childrenKey) {
  var rs = [];
  treeWalkParallel(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

exports.treeWalkDeep = treeWalkDeep;
exports.treeWalkParallel = treeWalkParallel;
exports.mapTreeDeep = mapTreeDeep;
exports.mapTreeParallel = mapTreeParallel;