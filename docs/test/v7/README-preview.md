# Monaco IDE V7 — Full-screen preview experiment

This version is copied from V5. V5 remains unchanged.

## What is new
- **Full Preview** opens a separate browser tab.
- The editor and preview communicate with `BroadcastChannel`.
- Workspace files are collected from the File System Access API index; unsaved Monaco models override disk content.
- The active/open HTML file is sent as the preview entry.
- Closing the preview is detected; click **Full Preview** to reopen it.

## Preview engine
- Sandpack Client (`@codesandbox/sandpack-client`) in a separate tab, loaded from esm.sh; internet access is required.

## Run
Serve the repository over HTTP(S), open `docs/v7/`, choose **Folder** to grant workspace access, then open an HTML file and click **Full Preview**. Both tabs must use the same origin. Allow pop-ups for the IDE site.

## Notes
- V6 is the native baseline and does not require a third-party preview library.
- V7 tests Sandpack; it requires internet access to load the client and Sandpack bundler.
- The existing split preview remains available in both versions.
