
import { $oauthClientInitialised, $isLoggedIn } from "./identity.js";
import { createRouter, redirectPage } from "@nanostores/router";

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

// we have to gate this otherwise it may try to redirect too early
$oauthClientInitialised.listen((val) => {
  if (val) {
    $isLoggedIn.subscribe((val) => {
      if (!val) return redirectPage($router, 'login');
      return redirectPage($router, 'home');
    });
  }
});
