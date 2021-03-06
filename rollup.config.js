import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },

  plugins: [
    babel({
      babelrc: false,
      presets: [
        ["env", {
          modules: false
        }],
      ],
      plugins: ["transform-object-rest-spread"],

      exclude: 'node_modules/**',
    }),
  ],
};
