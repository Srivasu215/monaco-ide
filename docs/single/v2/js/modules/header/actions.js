import { eventBus } from '../../core/eventBus.js';

export const actions = {
    toggleSidebar: () => {
        eventBus.emit('ui:toggleSidebar');
    },
    openFiles: () => {
        eventBus.emit('ui:openFiles');
    }
};

export default actions;
