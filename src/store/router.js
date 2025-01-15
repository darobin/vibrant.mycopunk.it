
import { $isLoggedIn } from "./identity.js";
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

$isLoggedIn.subscribe((val) => {
  if (!val) return redirectPage($router, 'login');
  return redirectPage($router, 'home');
});
