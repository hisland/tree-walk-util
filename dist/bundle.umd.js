(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.treeWalkUtil = {})));
}(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
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
  }

  var getParentObj = function getParentObj(parent, childrenKey) {
    return Array.isArray(parent) ? _defineProperty({}, childrenKey, parent) : parent;
  };

  function treeWalkDeepInner(parentObj, iterFn, childrenKey, __stopWhenFound) {
    var __lv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var parentList = parentObj[childrenKey];
    var maxLen = parentList.length;

    for (var ii1 = 0; ii1 < maxLen; ii1++) {
      var item = parentList[ii1];
      var ret1 = iterFn(item, ii1, parentList, parentObj, __lv);
      if (__stopWhenFound && ret1 !== undefined) return item;

      if (item[childrenKey]) {
        var ret2 = treeWalkDeepInner(item, iterFn, childrenKey, __stopWhenFound, __lv + 1);
        if (__stopWhenFound && ret2 !== undefined) return ret2;
      }
    }
  }

  function treeWalkDeep(parent, iterFn) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentObj = getParentObj(parent, childrenKey);
    treeWalkDeepInner(parentObj, iterFn, childrenKey, false);
  }
  function treeDeepFind(parent, iterFn) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentObj = getParentObj(parent, childrenKey);
    return treeWalkDeepInner(parentObj, iterFn, childrenKey, true);
  }

  function treeWalkParallelInner(parentObj, iterFn, childrenKey, __stopWhenFound) {
    var __lv = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var parentList = parentObj[childrenKey];
    var maxLen = parentList.length;
    var subList = [];

    for (var ii2 = 0; ii2 < maxLen; ii2++) {
      var item = parentList[ii2];
      var ret1 = iterFn(item, ii2, parentList, parentObj, __lv);
      if (__stopWhenFound && ret1 !== undefined) return item;

      if (item[childrenKey]) {
        subList = subList.concat(item[childrenKey]);
      }
    }

    if (subList.length) {
      var ret2 = treeWalkParallelInner(_defineProperty({}, childrenKey, subList), iterFn, childrenKey, __stopWhenFound, __lv + 1);
      if (__stopWhenFound && ret2 !== undefined) return ret2;
    }
  }

  function treeWalkParallel(parent, iterFn) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentObj = getParentObj(parent, childrenKey);
    treeWalkParallelInner(parentObj, iterFn, childrenKey, false);
  }
  function treeParallelFind(parent, iterFn) {
    var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
    var parentObj = getParentObj(parent, childrenKey);
    return treeWalkParallelInner(parentObj, iterFn, childrenKey, true);
  }

  function treeDeepToList(parent, childrenKey) {
    var rs = [];
    treeWalkDeep(parent, function (item) {
      rs.push(item);
    }, childrenKey);
    return rs;
  }
  function treeParallelToList(parent, childrenKey) {
    var rs = [];
    treeWalkParallel(parent, function (item) {
      rs.push(item);
    }, childrenKey);
    return rs;
  }

  function listToTree(rawList) {
    var _ref;

    var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
    var pidKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'pid';
    var childrenKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'children';
    var topLevelList = []; // 最顶层的list

    var allMapById = {}; // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖

    var loopList2 = []; // 临时用于存放有子节点的item
    // 第 1 轮循环, 用 1 个 map 挂所有节点, 并找到顶级节点列表

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rawList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item1 = _step.value;
        allMapById[item1[idKey]] = item1;

        if (item1[pidKey] === null || item1[pidKey] === undefined) {
          topLevelList.push(item1); // 没有父节点设置为顶层
        } else {
          loopList2.push(item1);
        }
      } // 第 2 轮循环

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    for (var _i = 0; _i < loopList2.length; _i++) {
      var item2 = loopList2[_i];
      var parent = allMapById[item2[pidKey]];

      if (parent) {
        if (parent[childrenKey]) {
          parent[childrenKey].push(item2); // 把自己推入父列表
        } else {
          parent[childrenKey] = [item2]; // 父列表不存在, 创建并推入
        }
      } else {
        topLevelList.push(item2); // 父节点不存在, 也设置为顶层
      }
    }

    return _ref = {}, _defineProperty(_ref, childrenKey, topLevelList), _defineProperty(_ref, "map", allMapById), _ref;
  }

  exports.treeWalkDeep = treeWalkDeep;
  exports.treeDeepFind = treeDeepFind;
  exports.treeWalkParallel = treeWalkParallel;
  exports.treeParallelFind = treeParallelFind;
  exports.treeDeepToList = treeDeepToList;
  exports.treeToList = treeDeepToList;
  exports.treeParallelToList = treeParallelToList;
  exports.listToTree = listToTree;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
