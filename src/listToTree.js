export function listToTree(
  rawList,
  idKey = 'id',
  pidKey = 'pid',
  childrenKey = 'children'
) {
  let topLevelList = [] // 最顶层的list
  let allMapById = {} // 存放所有节点的引用, 用idKey值作为key, 所以idKey不能重复, 否则会被覆盖
  let loopList2 = [] // 临时用于存放有子节点的item

  // 第 1 轮循环, 用 1 个 map 挂所有节点, 并找到顶级节点列表
  for (const item1 of rawList) {
    allMapById[item1[idKey]] = item1
    if (item1[pidKey] === null || item1[pidKey] === undefined) {
      topLevelList.push(item1) // 没有父节点设置为顶层
    } else {
      loopList2.push(item1)
    }
  }

  // 第 2 轮循环, 根据 pid 找到并挂在父节点下面
  for (const item2 of loopList2) {
    let parent = allMapById[item2[pidKey]]
    if (parent) {
      if (parent[childrenKey]) {
        parent[childrenKey].push(item2) // 把自己推入父列表
      } else {
        parent[childrenKey] = [item2] // 父列表不存在, 创建并推入
      }
    } else {
      topLevelList.push(item2) // 父节点不存在, 也设置为顶层
    }
  }

  return {
    [childrenKey]: topLevelList,
    map: allMapById, // 指向所有节点的map表
  }
}
