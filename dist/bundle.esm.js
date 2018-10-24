const getParentObj = (parent, childrenKey) =>
  Array.isArray(parent) ? { [childrenKey]: parent } : parent;

function treeWalkDeepInner(
  parentObj,
  iterFn,
  childrenKey,
  __stopWhenFound,
  __lv = 0
) {
  const parentList = parentObj[childrenKey];
  const maxLen = parentList.length;

  for (let ii1 = 0; ii1 < maxLen; ii1++) {
    const item = parentList[ii1];
    const ret1 = iterFn(item, ii1, parentList, parentObj, __lv);
    if (__stopWhenFound && ret1 !== undefined) return item
    if (item[childrenKey]) {
      const ret2 = treeWalkDeepInner(
        item,
        iterFn,
        childrenKey,
        __stopWhenFound,
        __lv + 1
      );
      if (__stopWhenFound && ret2 !== undefined) return ret2
    }
  }
}

function treeWalkDeep(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey);
  treeWalkDeepInner(parentObj, iterFn, childrenKey, false);
}

function treeDeepFind(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey);
  return treeWalkDeepInner(parentObj, iterFn, childrenKey, true)
}

function treeWalkParallelInner(
  parentObj,
  iterFn,
  childrenKey,
  __stopWhenFound,
  __lv = 0
) {
  const parentList = parentObj[childrenKey];
  const maxLen = parentList.length;

  let subList = [];
  for (let ii2 = 0; ii2 < maxLen; ii2++) {
    const item = parentList[ii2];
    const ret1 = iterFn(item, ii2, parentList, parentObj, __lv);
    if (__stopWhenFound && ret1 !== undefined) return item
    if (item[childrenKey]) {
      subList = subList.concat(item[childrenKey]);
    }
  }
  if (subList.length) {
    const ret2 = treeWalkParallelInner(
      {
        [childrenKey]: subList,
      },
      iterFn,
      childrenKey,
      __stopWhenFound,
      __lv + 1
    );
    if (__stopWhenFound && ret2 !== undefined) return ret2
  }
}

function treeWalkParallel(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey);
  treeWalkParallelInner(parentObj, iterFn, childrenKey, false);
}

function treeParallelFind(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey);
  return treeWalkParallelInner(parentObj, iterFn, childrenKey, true)
}

function treeDeepToList(parent, childrenKey) {
  let rs = [];
  treeWalkDeep(
    parent,
    item => {
      rs.push(item);
    },
    childrenKey
  );
  return rs
}

function treeParallelToList(parent, childrenKey) {
  let rs = [];
  treeWalkParallel(
    parent,
    item => {
      rs.push(item);
    },
    childrenKey
  );
  return rs
}

function listToTree(
  rawList,
  idKey = 'id',
  pidKey = 'pid',
  childrenKey = 'children'
) {
  let topLevelList = []; // 最顶层的list
  let allMapById = {}; // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
  let loopList2 = []; // 临时用于存放有子节点的item

  // 第 1 轮循环, 用 1 个 map 挂所有节点, 并找到顶级节点列表
  for (const item1 of rawList) {
    allMapById[item1[idKey]] = item1;
    if (item1[pidKey] === null || item1[pidKey] === undefined) {
      topLevelList.push(item1); // 没有父节点设置为顶层
    } else {
      loopList2.push(item1);
    }
  }

  // 第 2 轮循环
  for (const item2 of loopList2) {
    let parent = allMapById[item2[pidKey]];
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

  return {
    [childrenKey]: topLevelList,
    map: allMapById, // 指向所有节点的map表
  }
}

export { treeWalkDeep, treeDeepFind, treeWalkParallel, treeParallelFind, treeDeepToList, treeDeepToList as treeToList, treeParallelToList, listToTree };
