import { listToTree } from '../listToTree.js'

const oldList = [
  {
    id: 1,
    pid: null,
    god: 'cc',
  },
  {
    id: 2,
    pid: 1,
    god: 'yes',
  },
  {
    id: 3,
    pid: 1,
    god: 'test',
  },
  {
    id: 4,
    pid: 2,
    god: 'hao',
  },
  {
    id: 5,
    pid: 3,
    god: 'may',
  },
]

test('listToTree', () => {
  const newTree = listToTree(oldList)

  expect(newTree.children[0].id).toEqual(1)
  expect(newTree.children[0].god).toEqual('cc')

  expect(newTree.children[0].children[0].id).toEqual(2)
  expect(newTree.children[0].children[0].god).toEqual('yes')

  expect(newTree.children[0].children[1].id).toEqual(3)
  expect(newTree.children[0].children[1].god).toEqual('test')

  expect(newTree.children[0].children[0].children[0].id).toEqual(4)
  expect(newTree.children[0].children[0].children[0].god).toEqual('hao')

  expect(newTree.children[0].children[1].children[0].id).toEqual(5)
  expect(newTree.children[0].children[1].children[0].god).toEqual('may')

  expect(newTree.children[1]).toBeUndefined()
})

// 下面是目标结果
// const outTree = [
//   {
//     id: 1,
//     pid: null,
//     god: 'cc',
//     children: [
//       {
//         id: 2,
//         pid: 1,
//         god: 'yes',
//         children: [{ id: 4, pid: 2, god: 'hao' }],
//       },
//       {
//         id: 3,
//         pid: 1,
//         god: 'test',
//         children: [{ id: 5, pid: 3, god: 'may' }],
//       },
//     ],
//   },
// ]
