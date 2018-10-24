import { getParentObj } from './util.js'

function treeWalkParallelInner(
  parentObj,
  iterFn,
  childrenKey,
  __stopWhenFound,
  __lv = 0
) {
  const parentList = parentObj[childrenKey]
  const maxLen = parentList.length

  let subList = []
  for (let ii2 = 0; ii2 < maxLen; ii2++) {
    const item = parentList[ii2]
    const ret1 = iterFn(item, ii2, parentList, parentObj, __lv)
    if (__stopWhenFound && ret1 !== undefined) return item
    if (item[childrenKey]) {
      subList = subList.concat(item[childrenKey])
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
    )
    if (__stopWhenFound && ret2 !== undefined) return ret2
  }
}

export function treeWalkParallel(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey)
  treeWalkParallelInner(parentObj, iterFn, childrenKey, false)
}

export function treeParallelFind(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey)
  return treeWalkParallelInner(parentObj, iterFn, childrenKey, true)
}
