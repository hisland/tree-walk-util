function treeWalkDeepInner(parent, fn, childrenKey, __lv) {
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv);
    if (item[childrenKey]) {
      treeWalkDeepInner(item, fn, childrenKey, __lv + 1);
    }
  }
}

export function treeWalkDeep(parent, fn, childrenKey = 'children') {
  treeWalkDeepInner(parent, fn, childrenKey, 0);
}




function treeWalkParallel(parent, childrenKey, fn, __lv) {
  __lv = __lv || 0;
  for (var i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    fn(item, i, parent, __lv)
    if (item[childrenKey]) {
      treeWalkParallel(item, childrenKey, fn, __lv + 1)
    }
  }
}

function mapTree(orgParent, key, fn, __lv, rsParent) {
  rsParent = rsParent || {};

  var rs, len = orgParent[key].length;
  if (len) {
    rsParent[key] = [];
  }

  __lv = __lv || 0;
  for (var i = 0, item; i < len; i++) {
    item = orgParent[key][i];
    rs = fn(item, i, orgParent, __lv);
    rsParent[key].push(rs);
    if (item[key]) {
      mapTree(item, key, fn, __lv + 1, rs);
    }
  }

  return rsParent;
}
