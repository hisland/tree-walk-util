export type Parent = {
  [child: string]: unknown
}
export type ObjOrArr = object | []
export type IterFn = (
  item: Parent,
  ii1: number,
  parentList: unknown[],
  parentObj: Parent | null,
  __lv: number
) => unknown

export function returnInput<T>(arg: T) {
  return arg
}

export function getList(parent: ObjOrArr): unknown[] {
  if (Array.isArray(parent)) {
    return parent
  } else {
    return [parent]
  }
}
