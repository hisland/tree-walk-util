import { returnInput } from './util'
import { getList } from './util'

it('returnInput', () => {
  const obj = { halo: 1 }
  expect(returnInput(obj) === obj).toBe(true)
})

it('getList', () => {
  const obj1 = { halo: 1 }
  expect(getList(obj1)[0] === obj1).toBe(true)

  const arr1 = [{ halo: 1 }]
  expect(getList(arr1) === arr1).toBe(true)
  expect(getList(arr1)[0] === arr1[0]).toBe(true)
})
