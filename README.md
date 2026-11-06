# monaco-ide

A lightweight, standalone, browser-based Web IDE powered by Microsoft Monaco Editor and Ahead-of-Time (AOT) compiled Tailwind CSS.

## Features
- **Monaco Engine**: Powered by Monaco Editor (VS Code core) with full syntax highlighting, automatic layout, line numbers, and minimap controls.
- **Native OS File Dialog**: Open and edit any local file (`.json`, `.js`, `.html`, `.css`, `.txt`) directly in the browser via native file picker.
- **AOT Compiled Tailwind CSS**: Compiled via Tailwind CLI into a tiny, self-contained standalone CSS file (~8KB) with zero runtime dependencies.
- **Clean Architecture**: Versioned development (`v1`, `v2`...) with zero legacy clutter.

## Development
```bash
# Compile Tailwind CSS
npm run build:css

# Watch for CSS changes
npm run dev:css
```
