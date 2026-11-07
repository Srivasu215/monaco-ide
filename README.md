# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-sky.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor, Workspace Directory Explorer, Multi-Document Tabs, Live Split Preview, and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (mixed CSS frameworks and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the complete desktop IDE replacement?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Purged and minified at build time into an ultra-lean CSS file (~12 KB) with **zero runtime overhead**.
3. **Workspace Folder Explorer via File System Access API**: Using `window.showDirectoryPicker()`, users can open local project folders directly, browse a collapsible tree sidebar (`Ctrl+B`), and open files into tabs.
4. **Direct Disk Persistence (`Ctrl+S`)**: Writes edits directly back to your local files using `createWritable()` without file download prompts.
5. **Live Split-Screen Preview (`Ctrl+\`)**: Real-time side-by-side rendering for HTML, formatted JSON trees, and Markdown.

---

## ✨ Features

- 📁 **Workspace Folder Explorer**: Open entire local directories via `showDirectoryPicker` with collapsible tree navigation (`Ctrl+B`).
- 📑 **Multi-Document Tab Strip**: Open and switch between multiple files with zero-latency buffer swapping.
- 💾 **Native Direct Disk Save (Ctrl+S)**: Persist changes directly back to your local files on disk.
- 🪟 **Live Split-Screen Preview (Ctrl+\)**: Real-time preview for HTML (sandboxed iframe), formatted JSON, and Markdown.
- 📊 **22px Studio Status Bar**: Cursor position (`Ln/Col`), UTF-8, Spaces, Language mode, Word Wrap toggle (`Alt+Z`), and Minimap toggle.
- 🧹 **Built-in Code Formatter**: 1-click syntax formatting (`Shift+Alt+F`).
- 🟡 **Per-Tab Dirty Change Tracker**: Live unsaved changes dot (`•`) and tab-close protection.
- ⚡ **AOT Compiled Tailwind CSS**: Purged and minified at build time. Zero runtime Tailwind CDN overhead.
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V4)

```
+------------------------------------------------------------------------------------------------------------------------+
| [🗂️] [📄 File] [📁 Folder] [💾 Save (Ctrl+S)] [✨ Format] [🪟 Preview]        Active: [ sample.json • 0.4 KB ] [Saved ✓] |  <-- 42px Header
+--------------------+---------------------------------------------------------------------------------------------------+
| EXPLORER           | [📄 sample.json • ✕] [📄 index.js ✕] [📄 style.css ✕]                                        [+] |  <-- 34px Tab Strip
|                    +-------------------------------------------------+-------------------------------------------------+
| 📁 src             |                                                 | LIVE PREVIEW (Ctrl+\)                           |
|   📁 v4            |                                                 |                                                 |
|     📄 index.js    |                 MONACO EDITOR                   | - HTML sandboxed iframe                         |
|     📄 input.css   |                                                 | - Interactive JSON Tree                         |
| 📁 docs            |           - Multi-buffer isolated models        | - Markdown live renderer                        |
|   📄 index.html    |           - Direct disk persistence (Ctrl+S)    | - Real-time auto sync                           |
|   📄 sample.json   |           - Full viewport layout                |                                                 |
| 📄 package.json    |                                                 |                                                 |
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
  initTabManager,
  initTreeExplorer,
  initStatusBar,
  initPreviewManager
} from "monaco-ide";

// Bootstrap all Monaco IDE modules
initTabManager(editor, monaco);
initTreeExplorer(editor, onFileOpen);
initStatusBar(editor, monaco);
initPreviewManager(editor, monaco);
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

Open `docs/index.html` or `docs/v4/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration (strictly targets highest version v4)
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry (re-exports v4)
│   ├── v1/                # V1 historical archive
│   ├── v2/                # V2 historical archive
│   ├── v3/                # V3 historical archive
│   └── v4/                # V4 Active Source
│       ├── index.js       # V4 module exports
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & version directory
    ├── v1/                # V1 Read-only Studio
    ├── v2/                # V2 Single-File Direct Save Studio
    ├── v3/                # V3 Multi-Document Tabbed Studio
    └── v4/                # V4 Full Workspace Studio (Explorer + Split Preview + Status Bar)
        ├── index.html     # V4 Fullscreen Studio layout
        ├── sample.json    # Initial workspace sample
        ├── style.css      # Compiled standalone CSS
        └── js/
            ├── index.js          # Monaco IDE bootstrap
            ├── tabManager.js     # Tab strip & multi-model manager
            ├── treeExplorer.js   # Workspace directory tree explorer
            ├── statusBar.js      # Studio status bar & toggles
            └── previewManager.js # Live split-screen preview
```

---

## 🗺️ Roadmap

- **v1.0.0**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0**: Native File System Access API direct disk save (`Ctrl+S`), unsaved changes tracking, code formatter.
- **v3.0.0**: Multi-document tab strip, isolated Monaco text models, multi-file opening, per-tab dirty tracking.
- **v4.0.0 (Current)**: Workspace Directory Explorer (`showDirectoryPicker`), collapsible sidebar (`Ctrl+B`), live split preview (`Ctrl+\`), and 22px studio status bar (`Alt+Z`).

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
