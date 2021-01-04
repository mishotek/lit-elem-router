import resolve from '@rollup/plugin-node-resolve';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const copyConfig = {
    targets: [
        { src: 'src/components/*', dest: 'public' },
    ],
};

const config = [
    {
        input: ['src/router.js'],
        output: {
            dir: 'public/',
            format: 'es',
        },
        plugins: [
            peerDepsExternal(),
            minifyHTML(),
            copy(copyConfig),
            resolve(),
        ],
    },
];

export default config;
