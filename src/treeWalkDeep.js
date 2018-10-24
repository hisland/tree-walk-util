import { getParentObj } from './util.js'

function treeWalkDeepInner(
  parentObj,
  iterFn,
  childrenKey,
  __stopWhenFound,
  __lv = 0
) {
  const parentList = parentObj[childrenKey]
  const maxLen = parentList.length

  for (let ii1 = 0; ii1 < maxLen; ii1++) {
    const item = parentList[ii1]
    const ret1 = iterFn(item, ii1, parentList, parentObj, __lv)
    if (__stopWhenFound && ret1 !== undefined) return item
    if (item[childrenKey]) {
      const ret2 = treeWalkDeepInner(
        item,
        iterFn,
        childrenKey,
        __stopWhenFound,
        __lv + 1
      )
      if (__stopWhenFound && ret2 !== undefined) return ret2
    }
  }
}

export function treeWalkDeep(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey)
  treeWalkDeepInner(parentObj, iterFn, childrenKey, false)
}

export function treeDeepFind(parent, iterFn, childrenKey = 'children') {
  const parentObj = getParentObj(parent, childrenKey)
  return treeWalkDeepInner(parentObj, iterFn, childrenKey, true)
}
