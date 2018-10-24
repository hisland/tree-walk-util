import { treeWalkDeep } from '../treeWalkDeep.js'
import { treeWalkParallel } from '../treeWalkParallel.js'

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
  treeWalkDeep(oldTree, function(v, i, p, lv) {
    if (lv === 0 && i === 0) expect(v.some).toEqual('thing')
    if (lv === 0 && i === 1) expect(v.yes).toEqual('ok')
    if (lv === 1 && i === 0) expect(v).toEqual('a')
    if (lv === 1 && i === 1) expect(v).toEqual('b')
  })
})

test('treeWalkParallel', () => {
  treeWalkParallel(oldTree, function(v, i, p, lv) {
    if (lv === 0 && i === 0) expect(v.some).toEqual('thing')
    if (lv === 0 && i === 1) expect(v.yes).toEqual('ok')
    if (lv === 1 && i === 0) expect(v).toEqual('a')
    if (lv === 1 && i === 1) expect(v).toEqual('b')
  })
})
