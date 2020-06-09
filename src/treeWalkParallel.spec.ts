import { treeWalkParallel } from './treeWalkParallel'
import { treeParallelFind } from './treeWalkParallel'

const rawTree = {
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

describe('treeWalkParallel', () => {
  const arr: [string, object][] = [
    ['pass object', rawTree],
    ['pass array', [rawTree]],
  ]

  for (const [name, val2] of arr) {
    describe(name, () => {
      it('lv && index', () => {
        treeWalkParallel(val2, function (val, index, list, parent, lv) {
          if (lv === 0 && index === 0) expect(val.foo).toEqual('bar')

          if (lv === 1 && index === 0) expect(val.some).toEqual('thing')
          if (lv === 1 && index === 1) expect(val.yes).toEqual('ok')

          if (lv === 2 && index === 0) expect(val).toEqual('a')
          if (lv === 2 && index === 1) expect(val).toEqual('b')
        })
      })

      it('run times all', () => {
        let times = 0
        treeWalkParallel(val2, function (val, index, list, parent, lv) {
          times++
        })
        expect(times).toBe(5)
      })
    })
  }

  it('raw value loop', () => {
    let list = [123, 'abc', true]
    for (const val of list) {
      let times = 0
      let that
      treeWalkParallel((val as unknown) as object, function (
        val,
        index,
        list,
        parent,
        lv
      ) {
        times++
        that = val
      })
      expect(times).toBe(1)
      expect(that).toBe(val)
    }
  })
})

describe('treeParallelFind', () => {
  const arr: [string, object][] = [
    ['pass object', rawTree],
    ['pass array', [rawTree]],
  ]

  for (const [name, val2] of arr) {
    describe(name, () => {
      it('run times 1', () => {
        let times = 0
        treeParallelFind(val2, function (val, index, list, parent, lv) {
          times++
          if (val.foo === 'bar') {
            return true
          }
        })
        expect(times).toBe(1)
      })

      it('run times 2', () => {
        let times = 0
        treeParallelFind(val2, function (val, index, list, parent, lv) {
          times++
          if ((val as any) === 'a') {
            return true
          }
        })
        expect(times).toBe(4)
      })
    })
  }
})
