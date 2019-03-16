import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/lib/index.js',
  output: {
    file: 'dist/build/react-clean-calendar.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['react'],
  plugins: [
    terser(),
    babel({
      exclude: 'node_modules/**',
    }),
    postcss(),
  ],
};
