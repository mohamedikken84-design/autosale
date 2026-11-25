import type { Handler } from '@netlify/functions';
import { parseAutoScoutHtml } from '../../src/utils/autoscoutHtmlParser';

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

/**
 * Netlify Serverless Function: scrape-autoscout
 * Scrapes AutoScout24 listings or parses submitted HTML payloads cleanly.
 */
export const handler: Handler = async (event) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { url, rawText } = payload;

    if (!url && !rawText) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ success: false, error: 'Geen URL of advertentiegegevens opgegeven.' }),
      };
    }

    let html = rawText || '';
    let blockedByBotProtection = false;

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
            'Accept-Language': 'nl-BE,nl;q=0.9,en;q=0.8,fr;q=0.7',
            'Cache-Control': 'no-cache',
            Referer: 'https://www.autoscout24.be/',
          },
        });
        clearTimeout(timeout);

        const text = await response.text();
        if (response.status === 403 || response.status === 429 || isBotChallengePage(text)) {
          blockedByBotProtection = true;
        } else if (response.ok && text.length > 500) {
          html = text;
        }
      } catch (fetchErr) {
        console.warn('Fetch error in Netlify function:', fetchErr);
      }
    }

    if (!html || html.length < 50) {
      return {
        statusCode: 422,
        headers: corsHeaders,
        body: JSON.stringify({
          success: false,
          blocked: blockedByBotProtection,
          error: blockedByBotProtection
            ? 'AutoScout24 blokkeert automatische server-aanvragen (Cloudflare). Gebruik "Paginabron plakken (Ctrl+U)" of sleep een opgeslagen .html bestand voor 100% resultaat.'
            : 'Kon de advertentiepagina niet ophalen van AutoScout24. Gebruik "Paginabron plakken (Ctrl+U)" of sleep een .html bestand.',
        }),
      };
    }

    const scrapedData = parseAutoScoutHtml(html, url || '');

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        success: true,
        data: scrapedData,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        success: false,
        error: err?.message || 'Onverwachte fout bij analyseren van advertentie.',
      }),
    };
  }
};
