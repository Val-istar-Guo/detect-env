import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'dist/bundle.js',

  plugins: [
    babel({
      babelrc: false,
      "plugins": [ "transform-es2015-arrow-functions" ],
      exclude: 'node_modules/**',
    }),
  ],
};
