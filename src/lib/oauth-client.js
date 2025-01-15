
import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import isProd from './is-prod.js';

export let oauthClient;

export async function setupClient () {
  const metadataURL = isProd ? '/client-metadata.json' : '/dev-client-metadata.json';
  const r = await fetch(metadataURL);
  if (!r.ok) {
    console.error(`Failed to fetch own metadata, all is broken: ${r.statusText}.`);
    return;
  }
  const clientMetadata = await r.json();
  oauthClient = new BrowserOAuthClient({
    clientMetadata,
    handleResolver: 'https://bsky.social',
  });
}
