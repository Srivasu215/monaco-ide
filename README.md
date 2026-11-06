# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-sky.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor, Multi-Document Tabs, the File System Access API, and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (mixed CSS frameworks and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the IDE with real multi-file editing and disk saving?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Instead of loading heavy runtime compiler scripts in the browser, we compile Tailwind CSS directly through Node. The entire stylesheet compiles into a tiny, self-contained standalone CSS file (~12 KB) with **zero runtime overhead**.
3. **Multi-Document Tabs with Isolated Text Models**: Multiple files can be opened simultaneously. Each tab owns its own independent Monaco text model, preserving individual undo/redo histories, scroll positions, and dirty state.
4. **Native File System Access API (Direct Disk Save)**: Using modern browser File System Access APIs (`showOpenFilePicker` & `createWritable`), users can open multiple files from their local storage, edit, and hit `Ctrl+S` to write directly back to disk—no file download prompts required.

---

## ✨ Features

- 📑 **Multi-Document Tab Strip**: Open and switch between multiple files with zero-latency buffer swapping.
- 💾 **Native Direct Disk Save (Ctrl+S)**: Persist changes directly back to your local files using the File System Access API (`createWritable`).
- ⚡ **AOT Compiled Tailwind CSS**: Purged and minified at build time into a standalone file. Zero runtime Tailwind CDN dependencies.
- 🖥️ **Full-Viewport Desktop Shell**: True 100vw × 100vh window layout with zero unwanted browser scrollbars.
- 📂 **Multi-File Open Dialog (Ctrl+O)**: Open multiple files at once with automatic language intelligence (JSON, JavaScript, TypeScript, HTML, CSS, Markdown).
- 🧹 **Built-in Code Formatter**: 1-click syntax formatting (`Shift+Alt+F`).
- 🟡 **Per-Tab Dirty Change Tracker**: Live unsaved changes dot (`•`) and tab-close protection against data loss.
- 🛡️ **Graceful Fallbacks**: Works seamlessly across Chromium (direct disk save) and non-Chromium browsers (automatic blob download fallback).
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V3)

```
+-------------------------------------------------------------------------------------------------------------+
| [📂 Open] [💾 Save (Ctrl+S)] [✨ Format]                  Active: [ sample.json • 0.4 KB ] [Saved ✓] [Docs] |  <-- 42px Header
+-------------------------------------------------------------------------------------------------------------+
| [📄 sample.json • ✕] [📄 schema.json ✕] [📄 index.js ✕]                                               [+]  |  <-- 34px Tab Strip
+-------------------------------------------------------------------------------------------------------------+
|                                                                                                             |
|                                                                                                             |
|                                     MONACO EDITOR (100% Fullscreen)                                         |
|                                                                                                             |
|                               - Multi-buffer isolated Monaco models                                         |
|                               - Automatic layout & syntax highlighting                                      |
|                               - Full viewport: 100vw × calc(100vh - 76px)                                   |
|                               - File System Access API: direct disk persistence (Ctrl+S)                    |
|                               - Unsaved changes dirty tracking & tab guard                                  |
|                               - One-click formatting (Shift+Alt+F)                                          |
|                                                                                                             |
|                                                                                                             |
+-------------------------------------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start

### Installation

```bash
npm install monaco-ide
```

### Usage as a Module

```javascript
import { initTabManager, createTab, openFiles, saveActiveFile } from "monaco-ide";

// Connect multi-document tab manager to your Monaco editor instance
initTabManager(editor, monaco);
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

Open `docs/index.html` or `docs/v3/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration (strictly targets highest version)
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry (re-exports v3)
│   ├── v1/                # V1 historical archive
│   ├── v2/                # V2 historical archive
│   └── v3/                # V3 Active Source
│       ├── index.js       # V3 module exports
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & version directory
    ├── v1/                # V1 Read-only Studio
    ├── v2/                # V2 Single-File Direct Save Studio
    └── v3/                # V3 Multi-Document Tabbed Studio
        ├── index.html     # V3 Fullscreen Studio with Tab Strip
        ├── sample.json    # Initial workspace sample
        ├── style.css      # Compiled standalone CSS
        └── js/
            ├── index.js   # Monaco IDE bootstrap
            └── tabManager.js # Tab Strip, Multi-Model, Save & Format engine
```

---

## 🗺️ Roadmap

- **v1.0.0**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0**: Native File System Access API direct disk save (`Ctrl+S`), unsaved changes tracking, code formatter.
- **v3.0.0 (Current)**: Multi-document tab strip, isolated Monaco text models, multi-file opening, per-tab dirty tracking, direct disk save.
- **v4.0.0 (Planned)**: Workspace folder explorer (`showDirectoryPicker`) with collapsible left sidebar tree.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
