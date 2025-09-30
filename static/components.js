// Global state management
class AppState {
  constructor() {
    this.selectedApps = new Set();
    this.aurHelper = "paru";
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach((callback) => callback());
  }

  toggleApp(packageName) {
    if (this.selectedApps.has(packageName)) {
      this.selectedApps.delete(packageName);
    } else {
      this.selectedApps.add(packageName);
    }
    this.notify();
  }

  setAurHelper(helper) {
    this.aurHelper = helper;
    this.notify();
  }

  getSelectedApps() {
    return Array.from(this.selectedApps);
  }
}

window.appState = new AppState();

// App Item Component
class AppItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const packageName = this.getAttribute("package");
    const image = this.getAttribute("image");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .app-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          cursor: pointer;
        }
        input[type="checkbox"] {
          cursor: pointer;
        }
        img {
          width: 2rem;
          height: 2rem;
          aspect-ratio: 1;
        }
        .app-info {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .app-name {
          font-size: 0.875rem;
          line-height: 1.25;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          margin: 0;
        }
        .app-package {
          font-size: 0.75rem;
          color: #6b7280;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      </style>
      <label class="app-item" title="${packageName}">
        <input type="checkbox" value="${packageName}">
        <img src="/public/Assets/Apps/${image}" alt="${name}" width="32" height="32" loading="lazy">
        <div class="app-info">
          <h4 class="app-name" translate="no">${name}</h4>
          <small class="app-package" translate="no">${packageName}</small>
        </div>
      </label>
    `;

    const checkbox = this.shadowRoot.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
      window.appState.toggleApp(packageName);
    });

    this.unsubscribe = window.appState.subscribe(() => {
      checkbox.checked = window.appState.selectedApps.has(packageName);
    });
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// App List Component
class AppList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const title = this.getAttribute("title");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 20rem;
          break-inside: avoid;
          margin-bottom: 2rem;
        }
        h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .apps-list {
          display: flex;
          gap: 0.75rem;
          flex-direction: column;
        }
      </style>
      <div>
        <h3>${title}</h3>
        <div class="apps-list">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

// Apps Container Component
class AppsContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const category = this.getAttribute("category");
    const odd = this.getAttribute("odd") === "true";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .container {
          padding: 2rem;
          margin: 0 auto 2rem auto;
          background-color: ${odd ? "#e5e7eb" : "transparent"};
        }
        @media (prefers-color-scheme: dark) {
          .container {
            background-color: ${odd ? "#1f2937" : "transparent"};
          }
        }
        h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .columns {
          gap: 2rem;
          columns: 6;
        }
        @media (max-width: 1536px) {
          .columns {
            columns: 5;
          }
        }
        @media (max-width: 1280px) {
          .columns {
            columns: 4;
          }
        }
        @media (max-width: 1024px) {
          .columns {
            columns: 3;
          }
        }
        @media (max-width: 768px) {
          .columns {
            columns: 2;
          }
        }
        @media (max-width: 640px) {
          .columns {
            columns: 1;
          }
        }
      </style>
      <section class="container">
        <h2>${category}</h2>
        <div class="columns">
          <slot></slot>
        </div>
      </section>
    `;
  }
}

// Terminal Display Component
class TerminalDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.unsubscribe = window.appState.subscribe(() => this.updateCommand());
  }

  disconnectedCallback() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .terminal {
          background-color: #000;
          color: #fff;
          padding: 2rem;
        }
        .command {
          font-family: monospace;
        }
        .helper {
          color: #00ff00;
        }
        .flags {
          color: #ffffff;
        }
        .needed {
          color: #ff00ff;
        }
        .packages {
          color: #ffff00;
        }
        .buttons {
          background-color: #292524;
          padding-left: 2rem;
          margin: 2rem -2rem -2rem -2rem;
        }
        button {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          color: #fff;
          background-color: rgba(234, 179, 8, 0.1);
          border: none;
          cursor: pointer;
        }
        button.active {
          color: #000;
          background-color: #eab308;
        }
      </style>
      <div class="terminal" translate="no">
        <code class="command">
          <span class="helper" id="helper">paru</span>
          <span class="flags" id="flags">-S</span>
          <span class="needed"> --needed </span>
          <span class="packages" id="packages"></span>
        </code>
        <div class="buttons">
          <button data-helper="paru" class="active">paru</button>
          <button data-helper="yay">yay</button>
          <button data-helper="pamac">pamac</button>
        </div>
      </div>
    `;

    const buttons = this.shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const helper = button.getAttribute("data-helper");
        window.appState.setAurHelper(helper);
        this.updateButtons();
        this.updateCommand();
      });
    });
  }

  updateButtons() {
    const buttons = this.shadowRoot.querySelectorAll("button");
    buttons.forEach((button) => {
      const helper = button.getAttribute("data-helper");
      button.classList.toggle("active", helper === window.appState.aurHelper);
    });
  }

  updateCommand() {
    const helperSpan = this.shadowRoot.getElementById("helper");
    const flagsSpan = this.shadowRoot.getElementById("flags");
    const packagesSpan = this.shadowRoot.getElementById("packages");

    helperSpan.textContent = window.appState.aurHelper;

    if (window.appState.aurHelper === "pamac") {
      flagsSpan.textContent = " install";
    } else {
      flagsSpan.textContent = " -S";
    }

    packagesSpan.textContent = window.appState.getSelectedApps().join(" ");
  }
}

// Register custom elements
customElements.define("app-item", AppItem);
customElements.define("app-list", AppList);
customElements.define("apps-container", AppsContainer);
customElements.define("terminal-display", TerminalDisplay);
