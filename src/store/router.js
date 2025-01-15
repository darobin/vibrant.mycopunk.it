
import { $oauthClientInitialised, $isLoggedIn } from "./identity.js";
import { createRouter, redirectPage, openPage } from "@nanostores/router";

export const $router = createRouter(
  {
    home: '/',
    login: '/login',
    tos: '/tos',
    policy: '/policy',
    user: '/user/:handle',
  },
  {
    notFound: '/404',
  }
);

export function goto (route, params) {
  openPage($router, route, params);
}

// we have to gate this otherwise it may try to redirect too early
$oauthClientInitialised.listen((val) => {
  if (val) {
    $isLoggedIn.subscribe((val) => {
      if (!val) return redirectPage($router, 'login');
      if ($router.get().route === 'login') return redirectPage($router, 'home');
    });
  }
});
