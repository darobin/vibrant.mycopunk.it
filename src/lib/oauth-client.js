
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
    // clientMetadata = undefined;
    const base = `http://127.0.0.1:8654`;
    clientMetadata = {
      client_id: `https://vibrant.mycopunk.it/client-metadata.json`,
      client_name: "Vibrant",
      client_uri: base,
      logo_uri: "https://vibrant.mycopunk.it/icon.svg",
      tos_uri: "https://vibrant.mycopunk.it/tos",
      policy_uri: "https://vibrant.mycopunk.it/policy",
      redirect_uris: [base],
      scope: "atproto transition:generic",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      application_type: "web",
      dpop_bound_access_tokens: true
    };
  }
  oauthClient = new BrowserOAuthClient({
    clientMetadata,
    handleResolver: 'https://bsky.social',
  });
}
