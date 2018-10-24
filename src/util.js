export const returnInput = item => item
export const getParentObj = (parent, childrenKey) =>
  Array.isArray(parent) ? { [childrenKey]: parent } : parent
