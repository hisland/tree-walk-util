import * as ns from '../src/main';
import {
  expect
}
from 'chai';

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
describe('listToTree', function() {
  it('listToTree', function(done) {
    var tree = ns.listToTree(list);
    expect(tree.children[0].id).to.equal(1);
    expect(tree.children[0].god).to.equal('cc');

    expect(tree.children[0].children[0].id).to.equal(2);
    expect(tree.children[0].children[0].god).to.equal('yes');

    expect(tree.children[0].children[1].id).to.equal(3);
    expect(tree.children[0].children[1].god).to.equal('test');

    expect(tree.children[0].children[0].children[0].id).to.equal(4);
    expect(tree.children[0].children[0].children[0].god).to.equal('hao');

    expect(tree.children[0].children[1].children[0].id).to.equal(5);
    expect(tree.children[0].children[1].children[0].god).to.equal('may');

    expect(tree.children[1]).to.be.undefined;

    done();
  })
})
