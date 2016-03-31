
* walk through a tree data
* convert from tree to list or list to tree.
* tree structure base on array

`fn call signature: (item, index, parent, level)`

parent is:
```
{
  children: []
}
// or
{
  [childrenKey]: []
}
```

fn **do not** walk parent, just **recursion children**

sample tree data:

```
var tree = {
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
```

`treeWalkDeep(parent, fn, childrenKey = 'children')`:
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

`treeWalkParallel(parent, fn, childrenKey = 'children')`:
```
1o
  4o
    7o
      8o
2o
  5o
3o
  6o
```


`treeDeepToList(parent, fn = returnInput, childrenKey)`:

use `treeWalkDeep` to generate list


`treeParallelToList(parent, fn = returnInput, childrenKey)`:

use `treeWalkParallel` to generate list


`listToTree(list, idKey = 'id', pidKey = 'pid', childrenKey = 'children')`:

list is:
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
will generate:
```
id1
  id3
    id6
  id5
    id7
id2
  id4
id8
```
























