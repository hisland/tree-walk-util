import { getList } from './util'
import { Parent } from './util'
import { ObjOrArr } from './util'
import { IterFn } from './util'

function treeWalkDeepInner(
  list: unknown[],
  iterFn: IterFn,
  childrenKey: string,
  __parent: Parent | null,
  __stopWhenFound: boolean,
  __lv = 0
): unknown {
  const maxLen = list.length

  for (let ii1 = 0; ii1 < maxLen; ii1++) {
    const item = list[ii1] as Parent
    const ret1 = iterFn(item, ii1, list, __parent, __lv)
    if (__stopWhenFound && ret1 !== undefined && ret1 !== false) return item
    if (item[childrenKey]) {
      const ret2 = treeWalkDeepInner(
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

export function treeWalkDeep(
  parent: ObjOrArr,
  iterFn: IterFn,
  childrenKey = 'children'
) {
  treeWalkDeepInner(getList(parent), iterFn, childrenKey, null, false)
}

export function treeDeepFind(
  parent: ObjOrArr,
  iterFn: IterFn,
  childrenKey = 'children'
) {
  return treeWalkDeepInner(getList(parent), iterFn, childrenKey, null, true)
}
