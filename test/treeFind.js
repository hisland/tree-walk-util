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
describe('treeFind', function() {
  it('treeWalkDeepFind', function(done) {
    let n = 0;
    let ret = ns.treeWalkDeepFind(tree, function(v, i, p, lv) {
      n++;
      if (v === 'a') {
        return 'some-truth-value';
      }
    });

    expect(ret).to.equal('a');
    expect(n).to.equal(2);

    done();
  })
  it('treeWalkParallelFind', function(done) {
    let n = 0;
    let ret = ns.treeWalkParallelFind(tree, function(v, i, p, lv) {
      n++;
      if (v === 'a') {
        return 'some-truth-value';
      }
    });

    expect(ret).to.equal('a');
    expect(n).to.equal(3);

    done();
  })
})
