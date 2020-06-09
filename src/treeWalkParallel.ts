import { getList } from './util'
import { Parent } from './util'
import { ObjOrArr } from './util'
import { IterFn } from './util'

function treeWalkParallelInner(
  list: unknown[],
  iterFn: IterFn,
  childrenKey: string,
  __parent: Parent | null,
  __stopWhenFound: boolean,
  __lv = 0
): unknown {
  const maxLen = list.length

  let subList: unknown[] = []

  for (let ii2 = 0; ii2 < maxLen; ii2++) {
    const item = list[ii2] as Parent
    const ret1 = iterFn(item, ii2, list, __parent, __lv)
    if (__stopWhenFound && ret1 !== undefined && ret1 !== false) return item
    if (item[childrenKey]) {
      subList.push(item)
    }
  }

  if (subList.length) {
    const len = subList.length
    for (let ii3 = 0; ii3 < len; ii3++) {
      const item = subList[ii3] as Parent
      const ret2 = treeWalkParallelInner(
        item[childrenKey] as unknown[],
        iterFn,
        childrenKey,
        item,
        __stopWhenFound,
        __lv + 1
      )
      if (__stopWhenFound && ret2 !== undefined && ret2 !== false) return ret2
    }
  }
}

export function treeWalkParallel(
  parent: ObjOrArr,
  iterFn: IterFn,
  childrenKey = 'children'
) {
  treeWalkParallelInner(getList(parent), iterFn, childrenKey, null, false)
}

export function treeParallelFind(
  parent: ObjOrArr,
  iterFn: IterFn,
  childrenKey = 'children'
) {
  return treeWalkParallelInner(getList(parent), iterFn, childrenKey, null, true)
}
