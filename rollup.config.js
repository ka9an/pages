import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';


import path from 'path';
import litcss from 'rollup-plugin-lit-css';
import summary from 'rollup-plugin-summary';

function bundleText() {
    return {
        name: 'ignore-bundle-text',
        resolveId(source, importer) {
            if (source.indexOf('bundle-text') !== -1) {
                return path.resolve(path.dirname(importer), source.replace('bundle-text:', ''));
            }

            return null;
        },
        load() {
            return null;
        }
    };
}

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    // If using any exports from a symlinked project, uncomment the following:
    // preserveSymlinks: true,
    treeshake: true,
    input: {
        'json-viewer': 'src/index.js',
        JsonViewer: 'src/JsonViewer.js'
    },
    output: {
        entryFileNames: '[name].js',
        dir: 'dist',
        format: 'esm',
        sourcemap: false
    },
    plugins: [
        
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            configFile: './.babelrc',
            compact: false
        }),
        bundleText(),
        litcss({
            uglify: true
        }),
        nodeResolve(),

        summary()
    ]
};
