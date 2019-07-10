import pluginBabel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/index.js',
    plugins: [pluginBabel()],
    output: [
      {
        file: 'dist/bundle.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/bundle.umd.js',
        format: 'umd',
        name: 'treeWalkUtil',
      },
    ],
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
]
