import * as ns from '../src/main'
import {
  expect
}
from 'chai'

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
describe('treeWalk', function() {
  it('treeWalkDeep', function(done) {
    ns.treeWalkDeep(tree, function(v, i, p, lv) {
      if (lv === 0 && i === 0) expect(v.some).to.equal('thing');
      if (lv === 0 && i === 1) expect(v.yes).to.equal('ok');
      if (lv === 1 && i === 0) expect(v).to.equal('a');
      if (lv === 1 && i === 1) expect(v).to.equal('b');
    });
    done();
  })
  it('treeWalkParallel', function(done) {
    ns.treeWalkParallel(tree, function(v, i, p, lv) {
      if (lv === 0 && i === 0) expect(v.some).to.equal('thing');
      if (lv === 0 && i === 1) expect(v.yes).to.equal('ok');
      if (lv === 1 && i === 0) expect(v).to.equal('a');
      if (lv === 1 && i === 1) expect(v).to.equal('b');
    })
    done();
  })
})
