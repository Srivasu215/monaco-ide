# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-sky.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor, Virtual Workspace Asset Resolver, Event-Driven Architecture, Multi-Document Tabs, and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (mixed CSS frameworks and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the complete desktop IDE replacement?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Purged and minified at build time into an ultra-lean CSS file (~12 KB) with **zero runtime overhead**.
3. **Virtual Workspace Asset Resolver**: Automatically inlines relative `<link rel="stylesheet">` CSS files, scripts, and local images directly from the local project folder into the live preview pane. Zero missing styles!
4. **Decoupled Event Bus Architecture (`core/eventBus.js`)**: All features (`explorer`, `tabs`, `preview`, `statusBar`, `quickOpen`) communicate strictly via a pub/sub message broker, guaranteeing zero spaghetti coupling.
5. **Quick File Switcher Palette (`Ctrl+P`)**: Fuzzy-searches across all workspace files and open tabs for instantaneous navigation.

---

## ✨ Features

- 🎨 **Virtual Workspace Asset Resolver**: Inlines relative CSS stylesheets and resolves local assets so HTML files render with **100% full design and CSS layout** in the live preview.
- 📡 **Event-Driven Architecture**: Clean decoupled pub/sub message broker (`core/eventBus.js`) and central state store (`core/state.js`).
- ⚡ **Quick Open Palette (Ctrl+P)**: Instant fuzzy file search across all workspace files and open buffers.
- 📁 **Workspace Folder Explorer**: Open entire local directories via `showDirectoryPicker` with collapsible tree navigation (`Ctrl+B`).
- 📑 **Multi-Document Tab Strip**: Open and switch between multiple files with zero-latency buffer swapping and isolated undo/redo stacks.
- 💾 **Native Direct Disk Save (Ctrl+S)**: Persist changes directly back to your local files on disk.
- 🪟 **Live Split-Screen Preview (Ctrl+\)**: Real-time preview for HTML (with inlined CSS), formatted JSON trees, and Markdown.
- 📊 **22px Studio Status Bar**: Cursor position (`Ln/Col`), UTF-8, Spaces, Language mode, Word Wrap toggle (`Alt+Z`), and Minimap toggle.
- 🧹 **Built-in Code Formatter**: 1-click syntax formatting (`Shift+Alt+F`).
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V5)

```
+------------------------------------------------------------------------------------------------------------------------+
| [🗂️] [📄 File] [📁 Folder] [🔍 Ctrl+P] [💾 Save (Ctrl+S)] [✨ Format] [🪟 Preview]  Active: [ sample.json • 0.4 KB ] [Saved] |  <-- 42px Header
+--------------------+---------------------------------------------------------------------------------------------------+
| EXPLORER           | [📄 sample.json • ✕] [📄 index.html ✕] [📄 css/style.css ✕]                                  [+] |  <-- 34px Tab Strip
|                    +-------------------------------------------------+-------------------------------------------------+
| 📁 docs            |                                                 | LIVE PREVIEW (Ctrl+\) [Virtual CSS Active]     |
|   📁 css           |                                                 |                                                 |
|     📄 style.css   |                 MONACO EDITOR                   | - HTML sandboxed iframe                         |
|   📄 index.html    |                                                 | - Relative CSS auto-inlined                     |
| 📁 src             |           - Multi-buffer isolated models        | - Interactive JSON AST Tree                     |
|   📄 index.js      |           - Direct disk persistence (Ctrl+S)    | - Markdown live renderer                        |
| 📄 package.json    |           - Event-driven decoupled engine       | - Real-time auto sync                           |
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
  initTabs,
  initExplorer,
  initPreview,
  initStatusBar,
  initQuickOpen,
  eventBus,
  state
} from "monaco-ide";

// Bootstrap all Monaco IDE V5 modules
initTabs(editor, monaco);
initExplorer(editor, monaco);
initPreview(editor, monaco);
initStatusBar(editor, monaco);
initQuickOpen(editor, monaco);
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

Open `docs/index.html` or `docs/v5/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration (strictly targets highest version v5)
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry (re-exports v5)
│   ├── v1/                # V1 historical archive
│   ├── v2/                # V2 historical archive
│   ├── v3/                # V3 historical archive
│   ├── v4/                # V4 historical archive
│   └── v5/                # V5 Active Source
│       ├── index.js       # V5 module exports
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & version directory
    ├── v1/                # V1 Read-only Studio
    ├── v2/                # V2 Single-File Direct Save Studio
    ├── v3/                # V3 Multi-Document Tabbed Studio
    ├── v4/                # V4 Full Workspace Studio
    └── v5/                # V5 Desktop-Grade Studio (Virtual Asset Resolver + Event Bus + Ctrl+P)
        ├── index.html     # V5 Fullscreen Studio layout & Quick Open modal
        ├── sample.json    # Initial workspace sample
        ├── style.css      # Compiled standalone CSS
        └── js/
            ├── index.js              # Monaco IDE bootstrap
            ├── core/
            │   ├── eventBus.js       # Decoupled pub/sub message broker
            │   └── state.js          # Central state & asset indexer
            └── modules/
                ├── tabs.js           # Tab strip & multi-model manager
                ├── explorer.js       # Workspace directory tree explorer
                ├── preview.js        # Split preview & Virtual Workspace Asset Resolver
                ├── statusBar.js      # Studio status bar & toggles
                └── quickOpen.js      # Quick file switcher palette (Ctrl+P)
```

---

## 🗺️ Roadmap

- **v1.0.0**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0**: Native File System Access API direct disk save (`Ctrl+S`), unsaved changes tracking, code formatter.
- **v3.0.0**: Multi-document tab strip, isolated Monaco text models, multi-file opening, per-tab dirty tracking.
- **v4.0.0**: Workspace Directory Explorer (`showDirectoryPicker`), collapsible sidebar (`Ctrl+B`), live split preview (`Ctrl+\`), and 22px studio status bar (`Alt+Z`).
- **v5.0.0 (Current)**: Virtual Workspace Asset Resolver (100% styled live HTML preview with inlined workspace CSS), Event-Driven Architecture (`core/eventBus.js`), and Quick Open file switcher palette (`Ctrl+P`).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
