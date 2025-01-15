
import { BrowserOAuthClient } from '@atproto/oauth-client-browser';
import isProd from './is-prod.js';

export let oauthClient;

export async function setupClient () {
  let clientMetadata;
  if (isProd) {
    const r = await fetch('/client-metadata.json');
    if (!r.ok) {
      console.error(`Failed to fetch own metadata, all is broken: ${r.statusText}.`);
      return;
    }
    clientMetadata = await r.json();
  }
  else {
    const redir = 'http://127.0.0.1:8765/';
    const scope = 'atproto transition:generic';
    const client_id = `http://localhost?redirect_uri=${encodeURIComponent(redir)}&scope=${encodeURIComponent(scope)}`;
    clientMetadata = {
      client_id,
      redirect_uris: [redir],
      scope: "atproto transition:generic",
      token_endpoint_auth_method: "none",
      dpop_bound_access_tokens: true,
    };
  }
  oauthClient = new BrowserOAuthClient({
    clientMetadata,
    handleResolver: 'https://bsky.social',
  });
}
