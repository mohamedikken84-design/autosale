import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { scrapeAutoScoutListing } from './src/utils/autoscoutScraperServer';

function autoscoutScraperPlugin(): Plugin {
  return {
    name: 'autoscout-scraper-api',
    configureServer(server) {
      server.middlewares.use('/api/scrape-autoscout', (req, res, next) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const { url, rawText } = JSON.parse(body || '{}');
              if (!url && !rawText) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Geen URL of tekst opgegeven.' }));
                return;
              }
              const scraped = await scrapeAutoScoutListing(url, rawText);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, data: scraped }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Scrape mislukt' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), autoscoutScraperPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
