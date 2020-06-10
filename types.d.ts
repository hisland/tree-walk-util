type parent = [] | { children: [] }
type iterFn = (
  item: Object,
  ii1: string,
  parentList: [],
  parentObj: parent,
  __lv: number
) => any

declare function listToTree(
  rawList: [],
  idKey: string,
  pidKey: string,
  childrenKey: string
): {
  children: Object[]
  map: Object
}

declare function treeDeepToList(rawList: parent, childrenKey: string): []
declare function treeParallelToList(rawList: parent, childrenKey: string): []

declare function treeWalkDeep(
  parentObj: parent,
  iterFn1: iterFn,
  childrenKey: string,
  __stopWhenFound: boolean,
  __lv: number
): void

declare function treeWalkParallel(
  parentObj: parent,
  iterFn1: iterFn,
  childrenKey: string,
  __stopWhenFound: boolean,
  __lv: number
): void
