export const returnInput = item => item
export const getParentObj = (parent, childrenKey = 'children') =>
  Array.isArray(parent) ? { [childrenKey]: parent } : parent
