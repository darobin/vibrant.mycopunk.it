
import { LitElement, html, css, nothing } from 'lit';
import { StoreController } from "@nanostores/lit";
import { $identity } from '../store/identity.js';
import { goto } from '../store/router.js';

export class VibrantAvatar extends LitElement {
  #identity = new StoreController(this, $identity);
  static styles = [
    css`
      :host {
        display: block;
      }
      .avatar {
        display: flex;
        gap: var(--sl-spacing-x-small);
        align-items: end;
        justify-content: end;
      }
      sl-avatar::part(base) {
        border: solid 3px var(--magenta);
      }
    `
  ];
  handleSelect (evt) {
    console.warn(`handle select ${evt?.detail?.item?.value}`);
    const item = evt?.detail?.item?.value;
    if (item === 'user') return goto('user', { handle: this.#identity.value.handle });
    if (item === 'logout') return alert('Not yet supported!');
  }
  render () {
    const identity = this.#identity.value;
    if (!identity) return nothing;
    return html`<div class="avatar">
      <sl-dropdown placement="bottom-end">
        <sl-avatar slot="trigger" image=${identity.avatar} label=${identity.displayName}></sl-avatar>
        <sl-menu @sl-select=${this.handleSelect}>
          <sl-menu-item value="user">Profile</sl-menu-item>
          <sl-menu-item value="logout">Logout</sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    </div>`;
  }
}

customElements.define('v-avatar', VibrantAvatar);
