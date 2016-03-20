
* walk through a tree data
* convert from tree to list or list to tree.

fn函数格式: (item, index, parent, level)

treeWalkDeep:
```
1o
  2o
    3o
      4o
  5o
6o
  7o
8o
```
treeDeepToList: 采用 treeWalkDeep 进行转换 [1o, 2o, 3o, 4o,...8o]

treeWalkParallel:
```
1o
  4o
    7o
     8o
  5o
2o
  6o
3o
```
treeParallelToList: 采用 treeWalkParallel 进行转换 [1o, 2o, 3o, 4o,...8o]


listToTree: list item 包含parentId之类的属性
```
list = [
{id: 1, pid: null},
{id: 2, pid: null},
{id: 3, pid: 1},
{id: 4, pid: 2},
{id: 5, pid: 1},
{id: 6, pid: 3},
{id: 7, pid: 5},
{id: 8, pid: null},
]
```






























