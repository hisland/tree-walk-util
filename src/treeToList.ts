import { ObjOrArr } from './util'

import { treeWalkDeep } from './treeWalkDeep'
import { treeWalkParallel } from './treeWalkParallel'

export function treeDeepToList(parent: ObjOrArr, childrenKey = 'children') {
  let rs: unknown[] = []
  treeWalkDeep(
    parent,
    (item) => {
      rs.push(item)
    },
    childrenKey
  )
  return rs
}
export { treeDeepToList as treeToList }

export function treeParallelToList(parent: ObjOrArr, childrenKey = 'children') {
  let rs: unknown[] = []
  treeWalkParallel(
    parent,
    (item) => {
      rs.push(item)
    },
    childrenKey
  )
  return rs
}
