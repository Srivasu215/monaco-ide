# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-sky.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor, KeshavSoft Declarative DOM Primitive Bindings, Virtual Workspace Asset Resolver, and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (mixed CSS frameworks and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the complete desktop IDE replacement?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Purged and minified at build time into an ultra-lean CSS file (~12 KB) with **zero runtime overhead**.
3. **100% Declarative DOM Primitive Bindings (`dom-primitive-bindings`)**: Zero imperative `addEventListener` chaos. Every module declares its user actions in a human-readable `bindings.json` and clean `actions.js`, connected via `bindEvents()`.
4. **Virtual Workspace Asset Resolver & Pop-out Studio**: Inlines relative CSS stylesheets, resolves local assets, generates ES module import maps, and offers a 1-click pop-out to test web apps in a full browser tab with zero sandbox restrictions.
5. **Quick File Switcher Palette (`Ctrl+P`)**: Fuzzy-searches across all workspace files and open tabs for instantaneous navigation.

---

## ✨ Features

- 🔗 **Declarative DOM Primitive Bindings**: Built directly on KeshavSoft's `dom-primitive-bindings` (v5). UI interactions across `header`, `explorer`, `tabs`, `preview`, `statusBar`, and `quickOpen` are declared in `bindings.json`.
- 🎨 **Virtual Workspace Asset Resolver**: Inlines relative CSS stylesheets and resolves local assets so HTML files render with **100% full design and CSS layout** in the live preview.
- 🪟 **1-Click Standalone Pop-out Preview**: Launch your previewed app into a full dedicated browser window with native OS file dialog permissions.
- ⚡ **Quick Open Palette (Ctrl+P)**: Instant fuzzy file search across all workspace files and open buffers.
- 📁 **Workspace Folder Explorer**: Open entire local directories via `showDirectoryPicker` with collapsible tree navigation (`Ctrl+B`).
- 📑 **Multi-Document Tab Strip**: Open and switch between multiple files with zero-latency buffer swapping and isolated undo/redo stacks.
- 💾 **Native Direct Disk Save (Ctrl+S)**: Persist changes directly back to your local files on disk.
- 📊 **22px Studio Status Bar**: Cursor position (`Ln/Col`), UTF-8, Spaces, Language mode, Word Wrap toggle (`Alt+Z`), and Minimap toggle.
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V6)

```
+------------------------------------------------------------------------------------------------------------------------+
| [🗂️] [📄 File] [📁 Folder] [🔍 Ctrl+P] [💾 Save (Ctrl+S)] [✨ Format] [🪟 Preview]  Active: [ index.html • 5.6 KB ] [Saved]  |  <-- 42px Header
+--------------------+---------------------------------------------------------------------------------------------------+
| EXPLORER           | [📄 sample.json • ✕] [📄 index.html ✕] [📄 css/style.css ✕]                                  [+] |  <-- 34px Tab Strip
|                    +-------------------------------------------------+-------------------------------------------------+
| 📁 docs            |                                                 | LIVE PREVIEW (Ctrl+\) [Pop-out ↗] [CSS Active] |
|   📁 css           |                                                 |                                                 |
|     📄 style.css   |                 MONACO EDITOR                   | - HTML sandboxed iframe                         |
|   📄 index.html    |                                                 | - Relative CSS auto-inlined from workspace      |
| 📁 src             |           - Multi-buffer isolated models        | - ES module import map resolution               |
|   📄 index.js      |           - Direct disk persistence (Ctrl+S)    | - 1-Click popout to dedicated browser tab       |
| 📄 package.json    |           - Declarative bindings.json engine    | - Real-time auto sync                           |
+--------------------+-------------------------------------------------+-------------------------------------------------+
| ⚡ Monaco Studio | Ln 14, Col 8                                               [Wrap: On] [Map: Off] UTF-8 Spaces: 2 JSON |  <-- 22px Status Bar
+------------------------------------------------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start

### Installation

```bash
npm install monaco-ide
```

### Usage as a Module

```javascript
import {
  initHeader,
  initExplorer,
  initTabs,
  initPreview,
  initStatusBar,
  initQuickOpen,
  bindEvents
} from "monaco-ide";

// Bootstrap all Monaco IDE V6 modules
initHeader();
initExplorer();
initTabs();
initPreview();
initStatusBar();
initQuickOpen();
```

### Running Locally

```bash
# Clone the repository
git clone https://github.com/keshavsoft/monaco-ide.git
cd monaco-ide

# Install dev dependencies (Tailwind compiler)
npm install

# Build compiled Tailwind CSS for the highest version
npm run build:css
```

Open `docs/index.html` or `docs/v6/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration (strictly targets highest version v6)
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry (re-exports v6)
│   ├── v1/                # V1 historical archive
│   ├── v2/                # V2 historical archive
│   ├── v3/                # V3 historical archive
│   ├── v4/                # V4 historical archive
│   ├── v5/                # V5 historical archive
│   └── v6/                # V6 Active Source (Declarative DOM Primitive Bindings)
│       ├── index.js       # V6 module exports
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & version directory
    ├── v1/                # V1 Read-only Studio
    ├── v2/                # V2 Single-File Direct Save Studio
    ├── v3/                # V3 Multi-Document Tabbed Studio
    ├── v4/                # V4 Full Workspace Studio
    ├── v5/                # V5 Virtual Asset Resolver
    └── v6/                # V6 Declarative DOM Primitive Bindings Studio
        ├── index.html     # V6 Fullscreen Studio layout & Quick Open modal
        ├── sample.json    # Initial workspace sample
        ├── style.css      # Compiled standalone CSS
        └── js/
            ├── index.js              # Monaco IDE bootstrap
            ├── core/
            │   ├── bindings.js       # dom-primitive-bindings bindEvents engine
            │   ├── eventBus.js       # Decoupled pub/sub broker
            │   └── state.js          # Central state & asset indexer
            └── modules/
                ├── header/           # bindings.json + actions.js
                ├── explorer/         # bindings.json + actions.js
                ├── tabs/             # bindings.json + actions.js
                ├── preview/          # bindings.json + actions.js
                ├── statusBar/        # bindings.json + actions.js
                └── quickOpen/        # bindings.json + actions.js
```

---

## 🗺️ Roadmap

- **v1.0.0**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0**: Native File System Access API direct disk save (`Ctrl+S`), unsaved changes tracking, code formatter.
- **v3.0.0**: Multi-document tab strip, isolated Monaco text models, multi-file opening, per-tab dirty tracking.
- **v4.0.0**: Workspace Directory Explorer (`showDirectoryPicker`), collapsible sidebar (`Ctrl+B`), live split preview (`Ctrl+\`), and 22px studio status bar (`Alt+Z`).
- **v5.0.0**: Virtual Workspace Asset Resolver, Event Bus architecture, and Quick Open palette (`Ctrl+P`).
- **v6.0.0 (Current)**: 100% Declarative DOM Primitive Bindings (`dom-primitive-bindings`), modular `bindings.json` + `actions.js`, ES module import maps, and 1-click standalone pop-out preview.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
