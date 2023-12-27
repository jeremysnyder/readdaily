import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import browserslistToEsbuild from 'browserslist-to-esbuild'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react()],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000,
    },
    build: {
        target: browserslistToEsbuild(),
    },
    esbuild: {
        /**
         * Prevents ESBuild to throw when using a feature not supported by the
         * list of supported browsers coming from the `browserslist` file.
         */
        supported: {
            'top-level-await': true,
        },
    },
})