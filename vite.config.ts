import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  // Plugin SWC para React + TypeScript
  plugins: [react()],

  // Opciones para preprocesar SCSS (Sass)
  css: {
    preprocessorOptions: {
      scss: {
        // 1) Indica dónde buscar archivos .scss
        loadPaths: [
          path.resolve(__dirname, 'src/styles')
        ],// 2) Inyecta estas líneas al inicio de todos tus .scss
        additionalData: `@use "variables" as *;
        
        `
      }
    }
  },

  // Configuración de pruebas con Vitest
  test: {
    environment: 'jsdom',
    globals: true
  }
})
