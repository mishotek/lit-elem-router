import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import cleanup from 'rollup-plugin-cleanup';

const copyConfig = {
    targets: [
        { src: 'node_modules/@webcomponents', dest: 'public/node_modules' },
    ],
};

const config = {
    input: 'src/index.js',
    output: {
        dir: 'public/',
        format: 'es',
    },
    plugins: [
        minifyHTML(),
        copy(copyConfig),
        resolve(),
        cleanup(),
        terser(),
    ],
    preserveEntrySignatures: false,
};

export default config;
