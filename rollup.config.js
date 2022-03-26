import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from "rollup-plugin-dts";

const config = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/fira.js',
                format: 'es',
                name: 'Fira',
            },
            {
                file: 'dist/fira.min.js',
                format: 'es',
                name: 'Fira',
                plugins: [
                    terser(),
                ],
            }
        ],
        plugins: [
            typescript(),
        ],
    },
    {
        input: "./types/index.d.ts",
        output: [{ file: "./dist/fira.d.ts", format: "es" }],
        plugins: [dts()],
    },
];

export default config;