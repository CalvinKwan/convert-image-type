const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  selectFiles: () => ipcRenderer.invoke("select-files"),
  selectOutputFolder: () => ipcRenderer.invoke("select-output-folder"),
  convertFiles: (data) => ipcRenderer.invoke("convert-files", data),
  onConversionProgress: (callback) => ipcRenderer.on("conversion-progress", callback),
})
