import { returnInput } from './util.js'
import { treeWalkParallel } from './treeWalkParallel.js'
import { treeWalkDeep } from './treeWalkDeep.js'

export function mapTree(
  orgTree,
  iterFn = returnInput,
  childrenKey = 'children'
) {
  let rs = []
  treeWalkDeep(
    parent,
    function(...rest) {
      rs.push(iterFn(...rest))
    },
    childrenKey
  )
  return rs
}
export { treeDeepToList as treeToList }
