import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from 'vite-plugin-prerender'
import path from 'path'

const cities = ['krosno', 'jaslo', 'sanok', 'rzeszow', 'gorlice', 'brzozow'];
const cityRoutes = cities.map(c => `/kursy-udt-${c}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/', '/uslugi', '/polityka-prywatnosci', ...cityRoutes],
      rendererConfig: {
        maxConcurrentRoutes: 1,
        renderAfterDocumentEvent: 'custom-render-trigger'
      },
      postProcess(renderedRoute) {
        // Dodatkowa optymalizacja HTML po wyrenderowaniu
        renderedRoute.html = renderedRoute.html
          .replace(/<script-disabled/g, '<script')
          .replace(/<\/script-disabled/g, '</script');
        return renderedRoute;
      }
    })
  ],
})
