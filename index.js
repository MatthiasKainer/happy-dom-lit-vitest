import { html, LitElement } from "lit"
export class MyComponent extends LitElement {
  static get properties() {
    return {
      name: { type: String }
    };
  }

  constructor() {
    super();
  }

  render() {
    return this.name?.indexOf(",") > -1 ?
      html`${this.name.split(",").map(el => html`<p>Hello ${el}!</p>`)}`
      : html`<p>Hello, ${this.name}!</p>`;
  }
}

customElements.define('my-custom-element', MyComponent);
export const component = document.createElement("my-custom-element")