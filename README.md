# monaco-ide

[![npm version](https://img.shields.io/npm/v/monaco-ide.svg?style=flat-square)](https://www.npmjs.com/package/monaco-ide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live-Playground-emerald.svg?style=flat-square)](https://keshavsoft.github.io/monaco-ide/)

> **A high-performance, browser-native Web IDE powered by Microsoft Monaco Editor and Ahead-of-Time (AOT) compiled Tailwind CSS.**

---

## 📖 The Story Behind Monaco IDE

Throughout our journey of building multi-dimensional JSON transformation engines (`json-transformer-funcs-primitive`, `one-dimension`, and `two-dimensions`), we constantly experienced friction in the standard developer workflow:
- Constantly switching between bloated desktop IDEs (VS Code), local development servers, and browser tabs.
- Existing browser editor playgrounds were burdened with historical baggage (20+ legacy versions, mixed CSS frameworks, and sluggish runtime compilation).
- We asked a fundamental question: **Why can't our browser workspace BE the IDE?**

### The Architectural Breakthrough
1. **Monaco Needs Zero External Layout CSS**: Monaco Editor operates its own high-performance HTML5 Canvas and internal layout manager. It does not require massive styling frameworks.
2. **Ahead-of-Time (AOT) Tailwind Compilation**: Instead of loading heavy runtime compiler scripts in the browser, we compile Tailwind CSS directly through Node. The entire stylesheet compiles in under 120ms into a tiny, self-contained standalone CSS file (~12 KB) with **zero runtime overhead**.
3. **Native OS Integration**: Using standard browser File APIs (`<input type="file">` & `FileReader`), users can open, edit, and inspect any local file on their system directly in the browser with automatic language detection (JSON, JavaScript, HTML, CSS, Markdown).

**`monaco-ide` is the realization of that vision**: a pristine, modern, zero-bloat Web IDE built for maximum portability and speed.

---

## ✨ Features

- ⚡ **AOT Compiled Tailwind CSS**: Purged and minified at build time into a standalone file. Zero runtime Tailwind CDN dependencies.
- 🖥️ **Full-Viewport Desktop Shell**: True 100vw × 100vh window layout with zero unwanted browser scrollbars.
- 📂 **Native OS File Dialog**: Click **Select File** to open and edit any local file directly in your browser.
- 🎯 **Automatic Language Intelligence**: Detects `.json`, `.js`, `.ts`, `.html`, `.css`, and `.md` extensions and automatically sets Monaco's syntax highlighter and formatter.
- 🚀 **GitHub Pages Ready**: Self-contained `docs/` folder ready for instant static web deployment.

---

## 📐 Layout Architecture (V1)

```
+-----------------------------------------------------------------------------------------+
| [📂 Select File]                                                  File: [ sample.json ] |  <-- 42px Header
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                                                                                         |
|                             MONACO EDITOR (100% Fullscreen)                             |
|                                                                                         |
|                       - Automatic layout & syntax highlighting                          |
|                       - Full viewport: 100vw × calc(100vh - 42px)                       |
|                       - Native OS file picker loads any local file                      |
|                       - Auto language detection (.json, .js, .html, .css...)            |
|                                                                                         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 🚀 Quick Start

### Installation

```bash
npm install monaco-ide
```

### Usage as a Module

```javascript
import { initFilePicker } from "monaco-ide";

// Connect native file picker to your Monaco editor instance
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

# Watch for CSS changes during development
npm run dev:css
```

Open `docs/index.html` or `docs/v1/index.html` in any browser or local HTTP server.

---

## 📂 Project Structure

```
monaco-ide/
├── package.json           # npm configuration & scripts
├── LICENSE                # MIT License
├── README.md              # Project documentation
├── src/                   # Library source code
│   ├── index.js           # Package root entry
│   └── v1/
│       ├── index.js       # V1 export
│       └── input.css      # Tailwind v4 source entry
└── docs/                  # GitHub Pages live hosting
    ├── index.html         # Landing page with story & live playground link
    └── v1/
        ├── index.html     # V1 Fullscreen Studio (Tailwind markup)
        ├── sample.json    # Initial workspace sample
        ├── style.css      # AOT Compiled Tailwind CSS (~12 KB)
        └── js/
            ├── index.js   # Monaco IDE bootstrap
            └── filePicker.js # File dialog & syntax detector
```

---

## 🗺️ Roadmap

- **v1.0.0 (Current)**: Fullscreen Monaco IDE, native file picker, auto language detection, AOT Tailwind CSS pipeline.
- **v2.0.0 (Planned)**: VS Code-style left vertical Activity Bar, multi-document tab strip, split dual-pane live render studio.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

Developed with ❤️ by **[KeshavSoft](https://github.com/keshavsoft)**.
