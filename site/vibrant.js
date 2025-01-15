
import isProd from "../src/lib/is-prod.js";

// This is for dev, should stay at the top. Redirect to the dev site right away.
if (isProd && window.location.search === '?dev') window.location = `https://vibrant.bast/${window.location.hash}`;

import '@shoelace-style/shoelace';

import '../src/el/root.js';
import '../src/el/404.js';
import '../src/el/loading.js';
