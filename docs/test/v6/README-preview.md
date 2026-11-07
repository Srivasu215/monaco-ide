# Monaco IDE V6 — Full-screen direct preview

The preview opens in a separate browser tab and renders HTML directly in that tab's document. **V6 does not create or use an iframe.** Monaco and the preview tab communicate through BroadcastChannel. Unsaved Monaco model contents are sent along with workspace files.

Serve the repository over HTTP(S), open `docs/v6/`, grant workspace access, open an HTML file, and click **Full Preview**. Both tabs must share the same origin; allow pop-ups for the IDE site.

This is a development preview, not a security boundary for untrusted code: project JavaScript runs in the preview tab's origin. V5 remains unchanged.
