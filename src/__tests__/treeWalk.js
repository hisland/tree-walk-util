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
it('treeWalkDeep', () => {
  treeWalkDeep(oldTree, function(v, i, p, lv) {
    if (lv === 0 && i === 0) expect(v.some).to.equal('thing')
    if (lv === 0 && i === 1) expect(v.yes).to.equal('ok')
    if (lv === 1 && i === 0) expect(v).to.equal('a')
    if (lv === 1 && i === 1) expect(v).to.equal('b')
  })
})
it('treeWalkParallel', () => {
  treeWalkParallel(oldTree, function(v, i, p, lv) {
    if (lv === 0 && i === 0) expect(v.some).to.equal('thing')
    if (lv === 0 && i === 1) expect(v.yes).to.equal('ok')
    if (lv === 1 && i === 0) expect(v).to.equal('a')
    if (lv === 1 && i === 1) expect(v).to.equal('b')
  })
})
