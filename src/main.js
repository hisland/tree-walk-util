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
    treeWalkParallelInner({
      [childrenKey]: next
    }, fn, childrenKey, __lv + 1);
  }
}

export function treeWalkParallel(parent, fn, childrenKey = 'children') {
  treeWalkParallelInner(parent, fn, childrenKey, 0);
}


export function treeDeepToList(parent, fn, childrenKey) {
  var rs = [];
  treeWalkDeep(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

export function treeParallelToList(parent, fn, childrenKey) {
  var rs = [];
  treeWalkParallel(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

export function listToTree(list, idKey = 'id', pidKey = 'pid', childrenKey = 'children') {
  var rs = [];
  treeWalkParallel(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

function treeMapInner(orgParent, fn, childrenKey, rsParent, __lv) {
  var rs, len = orgParent[childrenKey].length;
  if (len) {
    rsParent[childrenKey] = [];
  }

  for (var i = 0, item; i < len; i++) {
    item = orgParent[childrenKey][i];
    rs = fn(item, i, orgParent, __lv);
    rsParent[childrenKey].push(rs);
    if (item[childrenKey]) {
      treeMapInner(item, fn, childrenKey, rs, __lv + 1);
    }
  }

  return rsParent;
}
export function treeMap(orgParent, fn, childrenKey = 'children', rsParent = {}) {
  return treeMapInner(orgParent, fn, childrenKey, rsParent, 0);
}
