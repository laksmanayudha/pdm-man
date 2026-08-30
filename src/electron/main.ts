import { app, BrowserWindow } from 'electron';
import { isDev } from './util.js';
import { pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';
import path from 'path';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5173');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    mainWindow.webContents.openDevTools();
    pollResources();
});