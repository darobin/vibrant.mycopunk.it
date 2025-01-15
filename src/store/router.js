
import { $oauthClientInitialised, $isLoggedIn } from "./identity.js";
import { createRouter, redirectPage } from "@nanostores/router";
import isProd from "../lib/is-prod.js";

export const $router = createRouter(
  {
    home: '/',
    login: '/login',
    tos: '/tos',
    policy: '/policy',
  },
  {
    notFound: '/404',
  }
);

// This is for dev, should stay at the top. Redirect to the dev site right away.
if (isProd && window.location.search === '?dev') {
  window.location = `https://vibrant.bast/${window.location.hash}`;
}
else {
  console.warn(`branch not redirect`, $oauthClientInitialised.get());
  // we have to gate this otherwise it may try to redirect too early
  $oauthClientInitialised.listen((val) => {
    console.warn(`oauth inited`, val);
    if (val) {
      $isLoggedIn.listen((val) => {
        console.warn(`login sub`, val);
        if (!val) return redirectPage($router, 'login');
        return redirectPage($router, 'home');
      });
    }
  })
}
