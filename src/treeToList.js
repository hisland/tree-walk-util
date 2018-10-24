import { returnInput } from './util.js'
import { treeWalkParallel } from './treeWalkParallel.js'
import { treeWalkDeep } from './treeWalkDeep.js'

export function treeDeepToList(parent, childrenKey) {
  let rs = []
  treeWalkDeep(
    parent,
    item => {
      rs.push(item)
    },
    childrenKey
  )
  return rs
}
export { treeDeepToList as treeToList }

export function treeParallelToList(parent, childrenKey) {
  let rs = []
  treeWalkParallel(
    parent,
    item => {
      rs.push(item)
    },
    childrenKey
  )
  return rs
}
