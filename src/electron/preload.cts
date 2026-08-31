const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) => {
    electron.ipcRenderer.on('statistics', (e: Event, stats: Statistics) => {
        callback(stats)
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke('getStaticData'),
} satisfies Window['electron']);