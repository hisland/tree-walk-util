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

function returnInput(item) {
  return item;
}

function treeDeepToList(parent) {
  var fn = arguments.length <= 1 || arguments[1] === undefined ? returnInput : arguments[1];
  var childrenKey = arguments[2];

  var rs = [];
  treeWalkDeep(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

function treeParallelToList(parent) {
  var fn = arguments.length <= 1 || arguments[1] === undefined ? returnInput : arguments[1];
  var childrenKey = arguments[2];

  var rs = [];
  treeWalkParallel(parent, function () {
    rs.push(fn.apply(undefined, arguments));
  }, childrenKey);
  return rs;
}

function listToTree(list) {
  var idKey = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

  var _ref;

  var pidKey = arguments.length <= 2 || arguments[2] === undefined ? 'pid' : arguments[2];
  var childrenKey = arguments.length <= 3 || arguments[3] === undefined ? 'children' : arguments[3];

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

      if (item[pidKey] !== null) {
        if (mapHasChildren[item[pidKey]]) {
          mapHasChildren[item[pidKey]][childrenKey].push(item);
        } else {
          mapHasChildren[item[pidKey]] = babelHelpers.defineProperty({}, childrenKey, [item]);
        }
      } else {
        topLevel.push(item); // top level
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

  return _ref = {}, babelHelpers.defineProperty(_ref, childrenKey, topLevel), babelHelpers.defineProperty(_ref, 'map', map // 指向所有节点的map表
  ), _ref;
}

export { treeWalkDeep, treeWalkParallel, treeDeepToList, treeParallelToList, listToTree };