import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
const buildOutDir = path.resolve('./docs');

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

export default defineConfig({
    base: '/Actress/',
    build: {
        outDir: buildOutDir
    },
    plugins: [
        vue(),
        dynamicImport(),
        VitePWA({
            injectRegister: null,
            strategies: 'injectManifest',
            injectManifest: {
                maximumFileSizeToCacheInBytes: 10000000
            },
            srcDir: 'src/js',
            filename: 'sw.js',
            devOptions: {
                enabled: true,
                type: 'module',
            },
            manifest: {
                id: "MI_Actress",
                name: "MI|Actress",
                short_name: "MI|Actress",
                description: 'Murakumo Industries|Actress Resume',
                theme_color: "#FAFAFA",
                background_color: '#FAFAFA',
                icons: [
                    {
                        src: 'android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            }
        })
    ]
})