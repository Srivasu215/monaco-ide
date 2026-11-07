export { bindEvents } from '../../docs/v6/js/core/bindings.js';
export { eventBus } from '../../docs/v6/js/core/eventBus.js';
export { state, getActiveTab, resolveWorkspaceFile } from '../../docs/v6/js/core/state.js';

export { initHeader } from '../../docs/v6/js/modules/header/index.js';
export { initExplorer, openWorkspace, toggleSidebar } from '../../docs/v6/js/modules/explorer/index.js';
export {
    initTabs,
    createTab,
    openOrSwitchTab,
    closeTab,
    switchTab,
    openFiles,
    saveActiveFile,
    formatActiveDocument,
    detectLanguage,
    formatBytes,
    getFileIconClass
} from '../../docs/v6/js/modules/tabs/index.js';
export { initPreview, togglePreview, popoutPreview, renderPreview } from '../../docs/v6/js/modules/preview/index.js';
export { initStatusBar, toggleWordWrap, toggleMinimap } from '../../docs/v6/js/modules/statusBar/index.js';
export { initQuickOpen, openQuickPalette, closeQuickPalette } from '../../docs/v6/js/modules/quickOpen/index.js';
