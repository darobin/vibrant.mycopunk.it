
import { Agent } from '@atproto/api';
import { BrowserOAuthClient } from '@atproto/oauth-client-browser';

const isProd = (window.location.hostname === 'vibrant.mycopunk.it');
let client;

document.getElementById('login').onclick = handleLogin;
async function handleLogin () {
  const handle = document.getElementById('handle').value;
  try {
    await client.signIn(handle, {
      // prompt: 'none',
      ui_locales: 'en', // Only supported by some OAuth servers (requires OpenID Connect support + i18n support)
    });
    console.warn(`This shouldn't run.`);
  }
  catch (err) {
    console.error(`Login cancelled.`);
  }
}

async function setupClient () {
  const metadataURL = isProd ? '/client-metadata.json' : '/dev-client-metadata.json';
  console.warn(`meta:`, metadataURL);
  const r = await fetch(metadataURL);
  if (!r.ok) {
    console.error(`Failed to fetch own metadata, all is broken: ${r.statusText}.`);
    return;
  }
  const clientMetadata = await r.json();
  client = new BrowserOAuthClient({
    clientMetadata,
    handleResolver: 'https://bsky.social',
  });

}

setupClient();
