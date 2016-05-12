import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {
  rollup
}
from 'rollup';

rollup({
  entry: 'src/main.js',
  plugins: [
    babel({
      babelrc: false,
      presets: ["es2015-rollup"],
      // "plugins": ["lodash"]
    }),
    nodeResolve({
      jsnext: true,
      main: true,
    }),
    commonjs(),
  ]
}).then(function(bundle) {
  bundle.write({
    dest: 'dest/bundle.es6.js',
    format: 'es6',
  });
  bundle.write({
    dest: 'dest/bundle.cmd.js',
    format: 'cjs',
  });
  bundle.write({
    dest: 'dest/bundle.amd.js',
    format: 'amd',
  });
})
