const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")
const fs = require("fs").promises
const heicConvert = require("heic-convert")

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "assets", "icon.png"), // Add icon later
    show: false,
  })

  mainWindow.loadFile(path.join(__dirname, "index.html"))

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  // Open DevTools in development
  if (process.argv.includes("--dev")) {
    mainWindow.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC handlers
ipcMain.handle("select-files", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "HEIC Images", extensions: ["heic", "HEIC"] },
      { name: "All Files", extensions: ["*"] },
    ],
  })
  return result
})

ipcMain.handle("select-output-folder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  })
  return result
})

ipcMain.handle("convert-files", async (event, { inputFiles, outputFolder, quality }) => {
  const results = []

  for (const inputFile of inputFiles) {
    try {
      // Read HEIC file
      const inputBuffer = await fs.readFile(inputFile)

      // Convert HEIC to JPEG
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: "JPEG",
        quality: quality / 100, // Convert percentage to decimal
      })

      // Generate output filename
      const fileName = path.basename(inputFile, path.extname(inputFile))
      const outputPath = path.join(outputFolder, `${fileName}.jpg`)

      // Write the converted file
      await fs.writeFile(outputPath, outputBuffer)

      results.push({
        success: true,
        inputFile,
        outputPath,
        message: "Converted successfully",
      })

      // Send progress update
      event.sender.send("conversion-progress", {
        completed: results.length,
        total: inputFiles.length,
        currentFile: fileName,
      })
    } catch (error) {
      results.push({
        success: false,
        inputFile,
        outputPath: null,
        message: error.message,
      })
    }
  }

  return results
})
