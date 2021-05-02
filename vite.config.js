import {resolve} from "path"
import {defineConfig} from "vite"
import {dependencies} from "./package.json"

/**
 * @type {import('vite').UserConfig}
 */
const config = defineConfig({
    build: {
        target: 'es6',
        outDir: 'dist',
        lib: {
            entry: resolve(__dirname, '/lib/main.ts'),
            name: 'vite-plugin-vue-markdown-resolver',
        },
        sourceMap: true,
        minify: true,
        brotliSize: true, // 禁用压缩大小报告，会加快速度
        rollupOptions: {
            external: Object.keys(dependencies)
        },
    }
})

export default config