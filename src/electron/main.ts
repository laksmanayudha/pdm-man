import { app, BrowserWindow } from 'electron';
import { ipcMainHandle, isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath, getUIPath } from './pathResolver.js';

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(getUIPath());
  }

  mainWindow.webContents.openDevTools();
  pollResources(mainWindow);

  ipcMainHandle('getStaticData', () => getStaticData());
});
