import { returnInput } from '../util.js'
import { getParentObj } from '../util.js'

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

test('returnInput', () => {
  const obj = { halo: 1 }
  expect(returnInput(obj)).toEqual(obj)
})

test('getParentObj', () => {
  const obj1 = { halo: 1 }
  expect(getParentObj(obj1)).toEqual(obj1)
  const obj2 = [{ halo: 1 }]
  expect(getParentObj(obj2)).toEqual({ children: obj2 })
  expect(getParentObj(obj2, 'children')).toEqual({ children: obj2 })
})
