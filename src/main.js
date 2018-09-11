function treeWalkDeepInner(
  parent,
  fn,
  childrenKey = 'children',
  __stopWhenFound = false,
  __lv = 0
) {
  for (let ii1 = 0, item, len = parent[childrenKey].length; ii1 < len; ii1++) {
    item = parent[childrenKey][ii1]
    let ret = fn(item, ii1, parent, __lv)
    if (__stopWhenFound && ret !== undefined) return item
    if (item[childrenKey]) {
      let ret2 = treeWalkDeepInner(
        item,
        fn,
        childrenKey,
        __stopWhenFound,
        __lv + 1
      )
      if (__stopWhenFound && ret2 !== undefined) return ret2
    }
  }
}

export function treeWalkDeep(parent, fn, childrenKey) {
  treeWalkDeepInner(parent, fn, childrenKey, false)
}

export function treeWalkDeepFind(parent, fn, childrenKey) {
  return treeWalkDeepInner(parent, fn, childrenKey, true)
}

function treeWalkParallelInner(
  parent,
  fn,
  childrenKey = 'children',
  __stopWhenFound = false,
  __lv = 0
) {
  let next = []
  for (let ii2 = 0, item, len = parent[childrenKey].length; ii2 < len; ii2++) {
    item = parent[childrenKey][ii2]
    let ret = fn(item, ii2, parent, __lv)
    if (__stopWhenFound && ret !== undefined) return item
    if (item[childrenKey]) {
      next = next.concat(item[childrenKey])
    }
  }
  if (next.length) {
    let ret2 = treeWalkParallelInner(
      {
        [childrenKey]: next,
      },
      fn,
      childrenKey,
      __stopWhenFound,
      __lv + 1
    )
    if (__stopWhenFound && ret2 !== undefined) return ret2
  }
}

export function treeWalkParallel(parent, fn, childrenKey) {
  treeWalkParallelInner(parent, fn, childrenKey, false)
}

export function treeWalkParallelFind(parent, fn, childrenKey) {
  return treeWalkParallelInner(parent, fn, childrenKey, true)
}

function returnInput(item) {
  return item
}

export function treeDeepToList(parent, fn = returnInput, childrenKey) {
  let rs = []
  treeWalkDeep(
    parent,
    function(...rest) {
      rs.push(fn(...rest))
    },
    childrenKey
  )
  return rs
}

export function treeParallelToList(parent, fn = returnInput, childrenKey) {
  let rs = []
  treeWalkParallel(
    parent,
    function(...rest) {
      rs.push(fn(...rest))
    },
    childrenKey
  )
  return rs
}

export function listToTree(
  list,
  idKey = 'id',
  pidKey = 'pid',
  childrenKey = 'children'
) {
  let topLevel = [], // 最顶层的list
    allMap = {}, // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
    loop2 = [] // 临时用于存放有子节点的item

  for (let ii = 0, len = list.length; ii < len; ii++) {
    let item = list[ii]

    allMap[item[idKey]] = item

    if (item[pidKey] === null || item[pidKey] === undefined) {
      topLevel.push(item) // 没有父节点设置为顶层
    } else {
      loop2.push(item)
    }
  }

  for (let ii = 0, len = loop2.length; ii < len; ii++) {
    let item = loop2[ii]

    let parent = allMap[item[pidKey]]
    if (parent) {
      if (parent[childrenKey]) {
        parent[childrenKey].push(item)
      } else {
        parent[childrenKey] = [item]
      }
    } else {
      topLevel.push(item) // 父节点 不存在也设置为顶层
    }
  }

  return {
    [childrenKey]: topLevel,
    map: allMap, // 指向所有节点的map表
  }
}
