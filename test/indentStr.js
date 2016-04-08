import {indentStrToTree} from '../src/main';
import {
  expect
}
from 'chai';

var str = `
hello
  god
    please
  3ks
  haha
`;

describe('indentStr:', function() {
  it('indentStrToTree:', function(done) {
    var tree = indentStrToTree(str);

    expect(tree.children[0].text).to.equal('hello');
    expect(tree.children[0].children[0].text).to.equal('god');
    expect(tree.children[0].children[0].children[0].text).to.equal('please');
    expect(tree.children[0].children[1].text).to.equal('3ks');
    expect(tree.children[0].children[2].text).to.equal('haha');

    done();
  })
})
