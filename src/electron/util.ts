import { ipcMain } from 'electron';
import type { WebContents, WebFrameMain } from 'electron';
import { pathToFileURL } from 'url';
import { getUIPath } from './pathResolver.js';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
  key: Key,
  handler: () => EventPayloadMapping[Key]
) {
  ipcMain.handle(key, (event) => {
    validateEventFrame(event.senderFrame);
    return handler();
  });
}

export function icpWebContentsSend<Key extends keyof EventPayloadMapping>(
  key: Key,
  webContents: WebContents,
  payload: EventPayloadMapping[Key]
) {
  webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain | null) {

  if (!frame) {
    throw new Error('Malicious event');
  }

  if (isDev() && new URL(frame.url).host === 'localhost:5174') {
    return;
  }

  const senderUrl = pathToFileURL(getUIPath()).toString();

  if (frame.url !== senderUrl) {
    throw new Error(`Malicious event from ${senderUrl}`);
  }
}