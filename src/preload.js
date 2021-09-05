import { ipcRenderer } from 'electron'
import child_process from 'child_process'
import fs from 'fs'

window.ElectronApi = {
  ipcRenderer: ipcRenderer,
}

window.NodeApi = {
  child_process: child_process,
  fs: fs,
}
