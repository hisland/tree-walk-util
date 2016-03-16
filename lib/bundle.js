'use strict';

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

exports.treeWalkDeep = treeWalkDeep;