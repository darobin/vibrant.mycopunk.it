
import { atom, onMount, task } from "nanostores";
import { setupClient, oauthClient } from "../lib/oauth-client.js";
import { setupAgent, agent } from "../lib/agent.js";
import { error } from './error.js';

export const $oauthClientInitialised = atom(false);
export const $loginLoading = atom(true);
export const $loginError = atom(false);
export const $isLoggedIn = atom(false);
export const $identity = atom(null);
export const $session = atom(null);

$session.listen(async (session) => {
  $loginLoading.set(false);
  oauthClient.addEventListener('deleted', logout);
  if (session) {
    $isLoggedIn.set(true);
    await setupAgent(session);
    const profileReq = await agent.getProfile({ actor: agent.accountDid });
    if (profileReq.success) $identity.set(profileReq.data);
    else error(`Could not load profile: ${profileReq.error}`);
    console.warn(`Profile:`, profileReq.data);
    window.agent = agent;
  }
  else {
    $isLoggedIn.set(false);
    $identity.set(false);
  }
});

onMount($oauthClientInitialised, () => {
  task(async () => {
    $loginError.set(null);
    $loginLoading.set(true);
    await setupClient();
    const result = await oauthClient.init();
    $session.set(result?.session);
    $oauthClientInitialised.set(true);
  });
});

export async function login (handle) {
  try {
    await oauthClient.signIn(handle, { ui_locales: 'en' });
    console.error(`This shouldn't run.`);
  }
  catch (err) {
    $loginError.set(`Login was cancelled.`);
  }
}

// export async function loadIdentity () {
//   $loginLoading.set(true);
//   const res = await fetch(`/api/identity`);
//   if (res.status !== 200) {
//     $isLoggedIn.set(false);
//     // $identity.set(null);
//   }
//   else {
//     $isLoggedIn.set(true);
//     // const json = await res.text();
//     // console.warn(`TEXT`, json);
//     // const { data } = JSON.parse(json);
//     // console.warn(`JSON`, data);
//     // $identity.set(data);
//     // console.warn(await res.text());
//     $identity.set((await res.json())?.data);
//   }
//   $loginLoading.set(false);
// }

export function logout () {
  // I don't think that we need to logout of the oauthClient?
  $loginLoading.set(false);
  $isLoggedIn.set(false);
  $loginError.set(null);
}
