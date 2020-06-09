import { listToTree } from './listToTree'
import { Item } from './listToTree'

const oldList = [
  { id: 1, pid: null, god: 'cc' },
  { id: 2, pid: 1, god: 'yes' },
  { id: 3, pid: 1, god: 'test' },
  { id: 4, pid: 2, god: 'hao' },
  { id: 5, pid: 3, god: 'may' },
  {
    id: 6,
    pid: 99, // not exist, will be top level
    god: 'isShe',
  },
]

test('listToTree', () => {
  const newTree = listToTree(oldList)
  const list = newTree.children as Item[]

  expect(list[0].id).toEqual(1)
  expect(list[0].god).toEqual('cc')

  expect((list[0].children as Item[])[0].id).toEqual(2)
  expect((list[0].children as Item[])[0].god).toEqual('yes')

  expect((list[0].children as Item[])[1].id).toEqual(3)
  expect((list[0].children as Item[])[1].god).toEqual('test')

  expect(((list[0].children as Item[])[0].children as Item[])[0].id).toEqual(4)
  expect(((list[0].children as Item[])[0].children as Item[])[0].god).toEqual(
    'hao'
  )

  expect(((list[0].children as Item[])[1].children as Item[])[0].id).toEqual(5)
  expect(((list[0].children as Item[])[1].children as Item[])[0].god).toEqual(
    'may'
  )

  expect(list[1].id).toEqual(6)
  expect(list[1].god).toEqual('isShe')
  expect(list[2]).toBeUndefined()
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
