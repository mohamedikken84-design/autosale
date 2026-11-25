import { parseAutoScoutHtml, ScrapedAutoScoutData } from './autoscoutHtmlParser';

export type { ScrapedAutoScoutData };

function isBotChallengePage(html: string): boolean {
  const lower = html.toLowerCase();
  return (
    lower.includes('cf-browser-verification') ||
    lower.includes('just a moment...') ||
    lower.includes('attention required! | cloudflare') ||
    lower.includes('datadome') ||
    lower.includes('px-captcha') ||
    (lower.includes('challenge-platform') && !lower.includes('__next_data__'))
  );
}

export async function scrapeAutoScoutListing(url: string, rawText?: string): Promise<ScrapedAutoScoutData> {
  let html = rawText || '';
  let blocked = false;

  if (!html && url && url.startsWith('http')) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'nl-BE,nl;q=0.9,en;q=0.8,fr;q=0.7,de;q=0.6',
          'Cache-Control': 'no-cache',
          Referer: 'https://www.autoscout24.be/',
        },
      });
      clearTimeout(timeout);

      const text = await response.text();
      if (response.status === 403 || response.status === 429 || isBotChallengePage(text)) {
        blocked = true;
      } else if (response.ok && text.length > 500) {
        html = text;
      }
    } catch (fetchErr) {
      console.warn('Direct fetch failed:', fetchErr);
    }
  }

  if (!html || html.length < 50) {
    throw new Error(
      blocked
        ? 'AutoScout24 blokkeert automatische server-aanvragen (Cloudflare). Plak de paginabron (Ctrl+U) of sleep een .html bestand voor directe import.'
        : 'Geen geldige advertentiepagina ontvangen van AutoScout24. Controleer de link of plak de paginabron (Ctrl+U).'
    );
  }

  return parseAutoScoutHtml(html, url || '');
}
