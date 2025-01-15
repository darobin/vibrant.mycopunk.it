
import { LitElement, html, css } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { StoreController } from '@nanostores/lit';
import { header2, buttons } from './styles.js';
import { login, $loginError } from '../store/identity.js';

class VibrantLogin extends LitElement {
  #loginError = new StoreController(this, $loginError);
  static styles = [
    css`
      :host {
        display: block;
      }
      form {
        display: flex;
        gap: var(--sl-spacing-small);
      }
      sl-input {
        min-width: 400px;
      }
      sl-alert {
        min-width: 400px;
        margin-bottom: var(--sl-spacing-small);
      }
    `,
    header2,
    buttons,
  ];
  async handleLogin (evt) {
    evt.preventDefault();
    const handle = new FormData(evt.target).get('handle');
    await login(handle);
  }
  render () {
    let handle = localStorage.getItem('previous-handle');
    return html`<sl-card>
      <h2 slot="header">login</h2>
      <sl-alert variant="danger" ?open=${!!this.#loginError.value} closable>
        <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
        <strong>${this.#loginError.value}</strong><br>
        Please try logging in again to continue.
      </sl-alert>
      <form @submit=${this.handleLogin}>
        <sl-input name="handle" placeholder="Enter your handle (e.g. alice.bsky.social)" value=${ifDefined(handle)} required></sl-input>
        <sl-button type="submit" class="action">Log in</sl-button>
      </form>
    </sl-card>`;
  }
}
customElements.define('v-login', VibrantLogin);
