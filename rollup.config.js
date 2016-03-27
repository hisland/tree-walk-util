import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'src/main.js',
  dest: 'dest/bundle.js',
  format: 'cjs',
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
};
