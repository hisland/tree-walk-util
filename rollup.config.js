import typescript from '@rollup/plugin-typescript'

export default [
  {
    input: 'src/index.ts',
    plugins: [typescript()],
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
      {
        file: 'dist/bundle.esm.js',
        format: 'esm',
      },
    ],
  },
]
