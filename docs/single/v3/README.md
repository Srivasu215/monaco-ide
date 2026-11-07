# Monaco IDE Single V2 — Single File Editor (Without Explorer)

Monaco IDE Single V2 is a streamlined, distraction-free code editor designed for working with a single file. The left workspace folder explorer has been removed, dedicating 100% of the screen width to the Monaco code editor.

---

### Key Features

* **No File Explorer**: Clean, full-width canvas without the left sidebar.
* **Single File Focus**: Open any file from disk via the **File** button (`Ctrl+O`).
* **Essential Studio Tools**:
  * Status bar with cursor position (`Ln/Col`), Word Wrap toggle (`Alt+Z`), Minimap toggle, and language indicator.
  * Inline live split preview (`Ctrl+\`).
  * Direct file buffer editing.

---

### Architecture & Active Modules

```
docs/single/v2/
├── index.html                  # Full-width single-file editor layout
├── sample.json                 # Initial buffer
├── style.css                   # IDE styling
├── README.md                   # Documentation
└── js/
    ├── index.js                # Bootstrapper (no explorer, no quickOpen)
    ├── core/
    │   ├── bindings.js         # DOM primitive bindings engine
    │   ├── eventBus.js         # Event bus
    │   └── state.js            # Tabs & active model state
    └── modules/
        ├── header/             # Open file action only
        ├── tabs/               # Single buffer management
        ├── preview/            # Split preview (Ctrl+\)
        └── statusBar/          # Compact status bar
```
