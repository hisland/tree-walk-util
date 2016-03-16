import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  dest: 'lib/bundle.js',
  format: 'cjs',
  plugins: [babel({
    presets: ["es2015-rollup"]
  })]
};
