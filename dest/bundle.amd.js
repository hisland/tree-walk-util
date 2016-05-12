define(['exports'], function (exports) { 'use strict';

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

  function indentStrToTree(str) {
    var indent_size = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    var reg = /^( *)(.*)$/gm;
    // 采用2维图的方式来处理
    var lvs = [[]];
    str = str.trim();

    function add(blank, text) {
      var lv = Math.ceil(blank / indent_size); // ceil, 尽可能认为是缩进
      var obj = {
        text: text
      };

      // 每次只缩进一层
      if (!lvs[lv]) {
        lvs.push([]);
        lv = lvs.length - 1;
      }

      if (lv > 0) {
        var lv_list = lvs[lv - 1];
        var parent = lv_list[lv_list.length - 1];
        if (parent.children) {
          parent.children.push(obj);
        } else {
          parent.children = [obj];
        }
        lvs[lv].push(obj);
      } else if (lv === 0) {
        lvs[lv].push(obj);
      }
    }

    str.replace(reg, function (match, blank, text) {
      add(blank.length, text);
    });

    return {
      children: lvs[0]
    };
  }

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
    var pidKey = arguments.length <= 2 || arguments[2] === undefined ? 'pid' : arguments[2];
    var childrenKey = arguments.length <= 3 || arguments[3] === undefined ? 'children' : arguments[3];

    var topLevel = [],
        // 最顶层的list
    map = {},
        // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复
    mapHasChildren = {}; // 暂时用于存放有子节点的item

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
      map[k][childrenKey] = mapHasChildren[k][childrenKey]; // 把暂时的放到map下
    }

    return babelHelpers.defineProperty({}, childrenKey, topLevel);
  }

  exports.treeWalkDeep = treeWalkDeep;
  exports.treeWalkParallel = treeWalkParallel;
  exports.treeDeepToList = treeDeepToList;
  exports.treeParallelToList = treeParallelToList;
  exports.listToTree = listToTree;
  exports.indentStrToTree = indentStrToTree;

});