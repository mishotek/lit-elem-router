import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import {terser} from "rollup-plugin-terser";

const config = [
    {
        input: [
            'src/components/lit-route.js',
            'src/components/lit-router.js',
        ],
        output: {
            dir: 'public/',
            format: 'es',
        },
        plugins: [
            peerDepsExternal(),
            minifyHTML(),
            resolve(),
            terser(),
        ],
    },
    {
        input: 'src/router.js',
        output: {
            dir: 'public/',
            format: 'es',
        },
        plugins: [
            peerDepsExternal(),
            resolve(),
        ],
    }
];

export default config;
