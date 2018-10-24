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

it('treeDeepToList', () => {
  const list = treeDeepToList(oldTree)
  expect(list[0].some).to.equal('thing')
  expect(list[1]).to.equal('a')
  expect(list[2]).to.equal('b')
  expect(list[3].yes).to.equal('ok')
})
it('treeParallelToList', () => {
  const list = treeParallelToList(oldTree)
  expect(list[0].some).to.equal('thing')
  expect(list[1].yes).to.equal('ok')
  expect(list[2]).to.equal('a')
  expect(list[3]).to.equal('b')
})
