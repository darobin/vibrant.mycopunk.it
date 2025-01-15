
import { LitElement, html, css } from 'lit';
import { StoreController } from "@nanostores/lit";
import { $router } from '../store/router.js';

export class VibrantRoot extends LitElement {
  #router = new StoreController(this, $router);
  static styles = [
    css`
      :host {
        display: block;
      }
      .login, .loading {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ];
  render () {
    const route = this.#router.value.route;
    console.warn(`route`, route);
    // if (route === 'loading') return html`<div class="loading"><pg-loading></pg-loading></div>`;
    if (route === 'login') return html`<div class="login"><v-login></v-login></div>`;
    if (route === 'tos') return html`<div>tos</div>`;
    if (route === 'policy') return html`<div>policy</div>`;
    if (route === 'home') return html`<div class="home">
      home
    </div>`;

    return html`<v-404></v-404>`;
  }
}

customElements.define('v-root', VibrantRoot);
