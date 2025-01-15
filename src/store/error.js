
import { atom } from "nanostores";

export const $error = atom(false);

export function error (str) {
  $error.set(str);
}

export function clear () {
  $error.set(false);
}
