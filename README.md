* walk through a tree data
* convert tree -> list
* convert list -> tree

1. treeWalkDeep, treeWalkParallel:

```
const treeData = {
  children: [{
    id: 1,
    children: [{
      id: 2,
      children: [{
        id: 3,
        children: [{
          id: 4
        }]
      }]
    }]
  }, {
    id: 5,
    children: [{
      id: 6
    }]
  }, {
    id: 7,
    children: [{
      id: 8
    }]
  }]
}
treeWalkDeep(treeData, function (item, index, parentList, parentObj, level) {
  // item order is below
}, 'children')
1o
  2o
    3o
      4o
5o
  6o
7o
  8o
```

```
treeWalkParallel(parent, function (item, index, parentList, parentObj, level) {
  // item order is below
}, 'children')
1o
  4o
    7o
      8o
2o
  5o
3o
  6o
```


2. listToTree :
```
rawList = [
  {id: 1, pid: null},
  {id: 2, pid: null},
  {id: 3, pid: 1},
  {id: 4, pid: 2},
  {id: 5, pid: 1},
  {id: 6, pid: 3},
  {id: 7, pid: 5},
  {id: 8, pid: null},
]
listToTree(rawList, 'id', 'pid', 'children')
// will generate tree:
id1
  id3
    id6
  id5
    id7
id2
  id4
id8
```
