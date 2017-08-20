import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: 'dist/bundle.js',

  plugins: [
    babel({
      babelrc: false,
      presets: [
        ["es2015", { "modules": false }]
      ],
      plugins: ["transform-object-rest-spread"],

      exclude: 'node_modules/**',
    }),
  ],
};
