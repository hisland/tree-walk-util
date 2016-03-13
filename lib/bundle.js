'use strict';

function treeWalkDeep(parent, childrenKey, fn, __lv) {
  __lv = __lv || 0;
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv);
    if (item[childrenKey]) {
      treeWalkDeep(item, childrenKey, fn, __lv + 1);
    }
  }
}
function treeWalkParallel(parent, childrenKey, fn, __lv) {
  __lv = __lv || 0;
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv);
    if (item[childrenKey]) {
      treeWalkParallel(item, childrenKey, fn, __lv + 1);
    }
  }
}

exports.treeWalkDeep = treeWalkDeep;
exports.treeWalkParallel = treeWalkParallel;