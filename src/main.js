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


export function mapTreeDeep(parent, fn, childrenKey) {
  var rs = [];
  treeWalkDeep(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

export function mapTreeParallel(parent, fn, childrenKey) {
  var rs = [];
  treeWalkParallel(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}
