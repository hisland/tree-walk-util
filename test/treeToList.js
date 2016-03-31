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
  it('treeDeepToList', function(done) {
    var list = ns.treeDeepToList(tree);
    expect(list[0].some).to.equal('thing');
    expect(list[1]).to.equal('a');
    expect(list[2]).to.equal('b');
    expect(list[3].yes).to.equal('ok');
    done();
  })
  it('treeParallelToList', function(done) {
    var list = ns.treeParallelToList(tree);
    expect(list[0].some).to.equal('thing');
    expect(list[1].yes).to.equal('ok');
    expect(list[2]).to.equal('a');
    expect(list[3]).to.equal('b');
    done();
  })
})
