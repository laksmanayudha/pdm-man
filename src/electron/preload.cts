const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback: (statistics: object) => void) => callback({}),
  getStaticData: () => console.log('static'),
});