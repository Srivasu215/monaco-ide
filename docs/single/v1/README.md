# Monaco IDE Single — Clean Focused Architecture

Monaco IDE Single (V1) is a focused, streamlined version of the IDE tailored for direct file editing without heavy service workers or background preview bridges.

---

### Architecture & Active Modules

```
docs/single/v1/
├── index.html                  # 42px Compact Studio Shell & Layout
├── sample.json                 # Initial buffer
├── style.css                   # IDE styles
└── js/
    ├── index.js                # App bootstrapper
    ├── core/
    │   ├── state.js            # Central State Store (workspace, tabs, activeTabId)
    │   ├── eventBus.js         # Decoupled Event Bus (pub/sub)
    │   └── bindings.js         # Declarative DOM Primitive Bindings engine
    └── modules/
        ├── header/             # Brand, File Open button, Sidebar toggle
        ├── explorer/           # Workspace Directory Tree
        ├── tabs/               # Multi-document buffer strip & model isolation
        ├── preview/            # Split Live Preview Pane (Ctrl+\)
        ├── statusBar/          # Compact 22px status bar (Ln/Col, UTF-8, Alt+Z Wrap)
        └── quickOpen/          # Fuzzy file search palette (Ctrl+P)
```
