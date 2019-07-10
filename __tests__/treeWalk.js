import { treeWalkDeep } from '../src/treeWalkDeep.js'
import { treeWalkParallel } from '../src/treeWalkParallel.js'

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

test('treeWalkDeep', () => {
  treeWalkDeep(oldTree, function(val, index, p, lv) {
    if (lv === 0 && index === 0) expect(val.some).toEqual('thing')
    if (lv === 0 && index === 1) expect(val.yes).toEqual('ok')
    if (lv === 1 && index === 0) expect(val).toEqual('a')
    if (lv === 1 && index === 1) expect(val).toEqual('b')
  })
})

test('treeWalkParallel', () => {
  treeWalkParallel(oldTree, function(val, index, p, lv) {
    if (lv === 0 && index === 0) expect(val.some).toEqual('thing')
    if (lv === 0 && index === 1) expect(val.yes).toEqual('ok')
    if (lv === 1 && index === 0) expect(val).toEqual('a')
    if (lv === 1 && index === 1) expect(val).toEqual('b')
  })
})
