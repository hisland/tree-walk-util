import {
  treeDeepToList,
  treeToList,
  treeParallelToList,
} from '../treeToList.js'

const oldTree = {
  foo: 'bar',
  children: [
    {
      some: 'thing',
      children: ['a', 'b'],
    },
    {
      yes: 'ok',
      may: 'be',
    },
  ],
}

test('treeDeepToList', () => {
  const list = treeDeepToList(oldTree)
  expect(list[0].some).toEqual('thing')
  expect(list[1]).toEqual('a')
  expect(list[2]).toEqual('b')
  expect(list[3].yes).toEqual('ok')
})

test('treeParallelToList', () => {
  const list = treeParallelToList(oldTree)
  expect(list[0].some).toEqual('thing')
  expect(list[1].yes).toEqual('ok')
  expect(list[2]).toEqual('a')
  expect(list[3]).toEqual('b')
})
