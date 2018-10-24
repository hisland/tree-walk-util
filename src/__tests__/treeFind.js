import { treeDeepFind } from '../treeWalkDeep.js'
import { treeParallelFind } from '../treeWalkParallel.js'

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

test('treeDeepFind', () => {
  const gotOne1 = treeDeepFind(oldTree, function(item) {
    return item === 'a'
  })
  expect(gotOne1).toEqual('a')
  const gotOne2 = treeDeepFind(oldTree, function(item) {
    return item && item.yes === 'ok'
  })
  expect(gotOne2.may).toEqual('be')
})

test('treeParallelFind', () => {
  const gotOne1 = treeParallelFind(oldTree, function(item) {
    return item === 'a'
  })
  expect(gotOne1).toEqual('a')
  const gotOne2 = treeParallelFind(oldTree, function(item) {
    return item && item.yes === 'ok'
  })
  expect(gotOne2.may).toEqual('be')
})
