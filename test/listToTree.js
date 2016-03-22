import * as ns from '../src/main'

var list = [{
  id: 1,
  pid: null,
  god: 'cc'
}, {
  id: 2,
  pid: 1,
  god: 'yes'
}, {
  id: 3,
  pid: 1,
  god: 'test'
}, {
  id: 4,
  pid: 2,
  god: 'hao'
}, {
  id: 5,
  pid: 3,
  god: 'may'
}, ]
var t2 = ns.listToTree(list);
console.log(JSON.stringify(t2, null, '  '));
