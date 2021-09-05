'use strict'

import path from 'path'
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib'


protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

const isDevelopment = process.env.NODE_ENV !== 'production'
let win

function createWindow () {
  let width  = (process.env.WEBPACK_DEV_SERVER_URL && !process.env.IS_TEST) ? 1200 : 800
  let height = (process.env.WEBPACK_DEV_SERVER_URL && !process.env.IS_TEST) ? 700 : 600

  win = new BrowserWindow({
    width: width,
    height: height,
    // transparent: true,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegrationInWorker: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL)
  {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  }
  else
  {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit() }
})

app.on('activate', () => {
  if (win === null) { createWindow() }
})

app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  // }
  createWindow()
})

ipcMain.on('minimize', (e, arg) => {
  win.minimize()
})

ipcMain.on('maximize', (e, arg) => {
  win.isMaximized() ? win.unmaximize() : win.maximize()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
