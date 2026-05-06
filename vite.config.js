import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cities = ['krosno', 'jaslo', 'sanok', 'rzeszow', 'gorlice', 'brzozow'];
const cityRoutes = cities.map(c => `/kursy-udt-${c}`);

// https://vitejs.dev/config/
export default defineConfig(async ({ command }) => {
  const isBuild = command === 'build';
  const plugins = [react()];

  if (isBuild) {
    // Dynamiczny import wtyczki tylko dla procesu budowania (build)
    const prerender = (await import('vite-plugin-prerender')).default;
    plugins.push(
      prerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/uslugi', '/polityka-prywatnosci', ...cityRoutes],
        rendererConfig: {
          maxConcurrentRoutes: 1,
          renderAfterDocumentEvent: 'custom-render-trigger'
        },
        postProcess(renderedRoute) {
          renderedRoute.html = renderedRoute.html
            .replace(/<script-disabled/g, '<script')
            .replace(/<\/script-disabled/g, '</script');
          return renderedRoute;
        }
      })
    );
  }

  return {
    plugins: plugins,
  }
})
