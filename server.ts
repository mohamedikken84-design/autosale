import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { scrapeAutoScoutListing } from './src/utils/autoscoutScraperServer';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware
  app.use(express.json({ limit: '15mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AutoScout24 Scraper Endpoint
  app.post('/api/scrape-autoscout', async (req, res) => {
    try {
      const { url, rawText } = req.body;
      if (!url && !rawText) {
        return res.status(400).json({ error: 'Geen URL of tekst opgegeven.' });
      }

      console.log(`[AutoScout Scraper] Scraping listing: ${url || 'Raw pasted text'}`);
      const scrapedData = await scrapeAutoScoutListing(url, rawText);

      return res.json({
        success: true,
        data: scrapedData
      });
    } catch (err: any) {
      console.error('[AutoScout Scraper] Error:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Kon advertentie niet ophalen van AutoScout24.'
      });
    }
  });

  // Vite development middleware vs production static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
