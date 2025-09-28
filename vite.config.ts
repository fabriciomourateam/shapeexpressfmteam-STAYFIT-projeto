import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Configuração para produção
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    // Configuração para preview - redirecionar todas as rotas para index.html
    historyApiFallback: true,
  },
  plugins: [
    react(),
    // Plugin SPA para redirecionar todas as rotas para index.html
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Excluir recursos do Vite e arquivos estáticos
          if (
            req.url?.startsWith('/@vite') ||
            req.url?.startsWith('/@react-refresh') ||
            req.url?.startsWith('/@fs') ||
            req.url?.startsWith('/node_modules') ||
            req.url?.includes('.') ||
            req.url?.startsWith('/api') ||
            req.url?.startsWith('/src') ||
            req.url === '/'
          ) {
            next();
            return;
          }
          
          // Para rotas SPA, redirecionar para index.html
          req.url = '/';
          next();
        });
      }
    },
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
}));
