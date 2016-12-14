function treeWalkDeepInner(parent, fn, childrenKey, __stopWhenFound = false, __lv = 0) {
  for (let i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    let ret = fn(item, i, parent, __lv);
    if (__stopWhenFound && ret !== undefined) return item;
    if (item[childrenKey]) {
      let ret2 = treeWalkDeepInner(item, fn, childrenKey, __stopWhenFound, __lv + 1);
      if (__stopWhenFound && ret2 !== undefined) return ret2;
    }
  }
}

export function treeWalkDeep(parent, fn, childrenKey = 'children') {
  treeWalkDeepInner(parent, fn, childrenKey);
}

function treeWalkParallelInner(parent, fn, childrenKey, __stopWhenFound = false, __lv = 0) {
  let next = [];
  for (let i = 0, item, len = parent[childrenKey].length; i < len; i++) {
    item = parent[childrenKey][i];
    let ret = fn(item, i, parent, __lv);
    if (__stopWhenFound && ret !== undefined) return item;
    if (item[childrenKey]) {
      next = next.concat(item[childrenKey]);
    }
  }
  if (next.length) {
    let ret2 = treeWalkParallelInner({
      [childrenKey]: next
    }, fn, childrenKey, __stopWhenFound, __lv + 1);
    if (__stopWhenFound && ret2 !== undefined) return ret2;
  }
}

export function treeWalkParallel(parent, fn, childrenKey = 'children') {
  treeWalkParallelInner(parent, fn, childrenKey);
}

function returnInput(item) {
  return item;
}

export function treeWalkDeepFind(parent, fn, childrenKey = 'children') {
  return treeWalkDeepInner(parent, fn, childrenKey, true);
}

export { treeWalkDeepFind as treeWalkFind } // walkFind 默认用 Deep 模式

export function treeWalkParallelFind(parent, fn, childrenKey = 'children') {
  return treeWalkParallelInner(parent, fn, childrenKey, true);
}

export function treeDeepToList(parent, fn = returnInput, childrenKey) {
  let rs = [];
  treeWalkDeep(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

export function treeParallelToList(parent, fn = returnInput, childrenKey) {
  let rs = [];
  treeWalkParallel(parent, function(...rest) {
    rs.push(fn(...rest))
  }, childrenKey);
  return rs;
}

export function listToTree(list, idKey = 'id', pidKey = 'pid', childrenKey = 'children') {
  let
    topLevel = [], // 最顶层的list
    map = {}, // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
    mapHasChildren = {}; // 临时用于存放有子节点的item

  for (let item of list) {
    map[item[idKey]] = item;

    if (item[pidKey] === null || item[pidKey] === undefined) {
      topLevel.push(item); // top level
    } else {
      if (mapHasChildren[item[pidKey]]) {
        mapHasChildren[item[pidKey]][childrenKey].push(item);
      } else {
        mapHasChildren[item[pidKey]] = {
          [childrenKey]: [item]
        }
      }
    }
  }

  for (let k in mapHasChildren) {
    map[k][childrenKey] = mapHasChildren[k][childrenKey]; // 把临时的放到map下
  }

  return {
    [childrenKey]: topLevel,
    map // 指向所有节点的map表
  };
}

