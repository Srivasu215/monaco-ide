# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-emerald.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor, the File System Access API, and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (20+ legacy versions, mixed CSS frameworks, and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the IDE with real file saving?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Instead of loading heavy runtime compiler scripts in the browser, we compile Tailwind CSS directly through Node. The entire stylesheet compiles into a tiny, self-contained standalone CSS file (~12 KB) with **zero runtime overhead**.
3. **Native File System Access API (Direct Disk Save)**: Using modern browser File System Access APIs (`showOpenFilePicker` & `createWritable`), users can open files from their local storage, edit in Monaco, and hit `Ctrl+S` to write directly back to disk—no file download prompts required.

**`monaco-ide` is the realization of that vision**: a pristine, modern, zero-bloat Web IDE built for maximum portability and speed.

---

## ✨ Features

- 💾 **Native Direct Disk Save (Ctrl+S)**: Persist changes directly back to your local files using the File System Access API (`createWritable`).
- ⚡ **AOT Compiled Tailwind CSS**: Purged and minified at build time into a standalone file. Zero runtime Tailwind CDN dependencies.
- 🖥️ **Full-Viewport Desktop Shell**: True 100vw × 100vh window layout with zero unwanted browser scrollbars.
- 📂 **Native OS File Dialog (Ctrl+O)**: Open and edit any local file directly with automatic language intelligence (JSON, JavaScript, TypeScript, HTML, CSS, Markdown).
- 🧹 **Built-in Code Formatter**: 1-click syntax formatting (`Shift+Alt+F`).
- 🟡 **Real-time Dirty Change Tracker**: Live unsaved changes dot (`•`) and tab-close protection.
- 🛡️ **Graceful Fallbacks**: Works seamlessly across Chromium (direct disk save) and non-Chromium browsers (automatic blob download fallback).
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V2)

```
+-------------------------------------------------------------------------------------------------------------+
| [📂 Open] [💾 Save (Ctrl+S)] [✨ Format]                  File: [ sample.json • 0.4 KB ] [Saved ✓] [Docs]   |  <-- 42px Header
+-------------------------------------------------------------------------------------------------------------+
|                                                                                                             |
|                                                                                                             |
|                                     MONACO EDITOR (100% Fullscreen)                                         |
|                                                                                                             |
|                               - Automatic layout & syntax highlighting                                      |
|                               - Full viewport: 100vw × calc(100vh - 42px)                                   |
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
import { initFilePicker, openFile, saveFile, formatCode } from "monaco-ide/v2";

// Connect native file manager to your Monaco editor instance
initFilePicker(editor, monaco);
```

### Running Locally

```bash
# Clone the repository
git clone https://github.com/keshavsoft/monaco-ide.git
cd monaco-ide

# Install dev dependencies (Tailwind compiler)
npm install

# Build compiled Tailwind CSS
npm run build:css
npm run build:css:v2
```

Open `docs/index.html` or `docs/v2/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration & scripts
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry (v1 & v2 exports)
│   ├── v1/
│   │   ├── index.js       # V1 export
│   │   └── input.css      # Tailwind v4 source entry
│   └── v2/
│       ├── index.js       # V2 export (File System Access & formatters)
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & version directory
    ├── v1/                # V1 Read-only Studio
    └── v2/                # V2 Full Direct-Disk Saving Studio
        ├── index.html     # V2 Fullscreen Studio with Save & Format controls
        ├── sample.json    # Initial workspace sample
        ├── style.css      # Compiled standalone CSS
        └── js/
            ├── index.js   # Monaco IDE bootstrap
            └── filePicker.js # File System Access API, Save, Format & Dirty state
```

---

## 🗺️ Roadmap

- **v1.0.0**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0 (Current)**: Native File System Access API direct disk save (`Ctrl+S`), unsaved changes tracking, code formatter (`Shift+Alt+F`), and tab guard.
- **v3.0.0 (Planned)**: Left vertical Activity Bar, tabbed multi-buffer navigation, and live preview panels.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
