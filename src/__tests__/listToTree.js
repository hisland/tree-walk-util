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
  expect(newTree.children[0].id).to.equal(1)
  expect(newTree.children[0].god).to.equal('cc')

  expect(newTree.children[0].children[0].id).to.equal(2)
  expect(newTree.children[0].children[0].god).to.equal('yes')

  expect(newTree.children[0].children[1].id).to.equal(3)
  expect(newTree.children[0].children[1].god).to.equal('test')

  expect(newTree.children[0].children[0].children[0].id).to.equal(4)
  expect(newTree.children[0].children[0].children[0].god).to.equal('hao')

  expect(newTree.children[0].children[1].children[0].id).to.equal(5)
  expect(newTree.children[0].children[1].children[0].god).to.equal('may')

  expect(newTree.children[1]).to.be.undefined
})
