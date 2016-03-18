import * as ns from '../src/main'


var tree = {
  foo: 'bar',
  children: [{
    some: 'thing',
    children: ['a', 'b']
  }, {
    yes: 'ok',
    may: 'be'
  }]
}


ns.treeWalkDeep(tree, function(v, i, p, lv){
  console.log(v, i, lv);
})

ns.treeWalkParallel(tree, function(v, i, p, lv){
  console.log(v, i, lv);
})
