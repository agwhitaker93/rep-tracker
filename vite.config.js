import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [preact()],
    base: '/rep-tracker',

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
    }
})

