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
    dest: 'dist/bundle.es6.js',
    format: 'es',
  });
  bundle.write({
    dest: 'dist/bundle.cmd.js',
    format: 'cjs',
  });
  bundle.write({
    dest: 'dist/bundle.amd.js',
    format: 'amd',
  });
})
