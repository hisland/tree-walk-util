import { treeDeepToList } from './treeToList'
import { treeToList } from './treeToList'
import { treeParallelToList } from './treeToList'

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
const list1: unknown[] = []

loop1([rawTree])
function loop1(list: unknown[]) {
  for (const vv of list) {
    list1.push(vv)
    if ((vv as any).children) {
      loop1((vv as any).children)
    }
  }
}

const list2: unknown[] = []
loop2([rawTree])
function loop2(list: unknown[]) {
  const sub: unknown[] = []
  for (const vv of list) {
    list2.push(vv)
    if ((vv as any).children) {
      sub.push(vv)
    }
  }
  for (const vv of sub) {
    loop2((vv as any).children)
  }
}

describe('treeToList', () => {
  const arr: [string, object][] = [
    ['pass object', rawTree],
    ['pass array', [rawTree]],
  ]

  for (const [name, val2] of arr) {
    describe(name, () => {
      it('lv && index', () => {
        {
          const rs1 = treeDeepToList(val2)
          expect(rs1).toEqual(list1)
        }

        {
          const rs1 = treeToList(val2)
          expect(rs1).toEqual(list1)
        }

        {
          const rs1 = treeParallelToList(val2)
          expect(rs1).toEqual(list2)
        }
      })
    })
  }

  it('raw value list', () => {
    let list = [123, 'abc', true]
    {
      const rs1 = treeDeepToList((list as unknown) as object)
      expect(rs1).toEqual([123, 'abc', true])
    }

    {
      const rs1 = treeToList((list as unknown) as object)
      expect(rs1).toEqual([123, 'abc', true])
    }

    {
      const rs1 = treeParallelToList((list as unknown) as object)
      expect(rs1).toEqual([123, 'abc', true])
    }
  })
})
