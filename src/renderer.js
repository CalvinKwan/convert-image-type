let selectedFiles = []
let outputFolder = ""
let isConverting = false

// DOM elements
const selectFilesBtn = document.getElementById("selectFilesBtn")
const selectOutputBtn = document.getElementById("selectOutputBtn")
const convertBtn = document.getElementById("convertBtn")
const selectedFilesDiv = document.getElementById("selectedFiles")
const outputFolderDiv = document.getElementById("outputFolder")
const qualitySlider = document.getElementById("qualitySlider")
const qualityValue = document.getElementById("qualityValue")
const progressSection = document.getElementById("progressSection")
const progressBar = document.getElementById("progressBar")
const progressText = document.getElementById("progressText")
const results = document.getElementById("results")
const resultsList = document.getElementById("resultsList")

// Event listeners
selectFilesBtn.addEventListener("click", selectFiles)
selectOutputBtn.addEventListener("click", selectOutputFolder)
convertBtn.addEventListener("click", convertFiles)
qualitySlider.addEventListener("input", updateQuality)

// Listen for conversion progress
window.electronAPI.onConversionProgress((event, data) => {
  updateProgress(data.completed, data.total, data.currentFile)
})

function updateQuality() {
  qualityValue.textContent = qualitySlider.value
}

async function selectFiles() {
  try {
    const result = await window.electronAPI.selectFiles()
    if (!result.canceled && result.filePaths.length > 0) {
      selectedFiles = result.filePaths
      displaySelectedFiles()
      checkReadyToConvert()
    }
  } catch (error) {
    console.error("Error selecting files:", error)
    alert("Error selecting files. Please try again.")
  }
}

async function selectOutputFolder() {
  try {
    const result = await window.electronAPI.selectOutputFolder()
    if (!result.canceled && result.filePaths.length > 0) {
      outputFolder = result.filePaths[0]
      displayOutputFolder()
      checkReadyToConvert()
    }
  } catch (error) {
    console.error("Error selecting output folder:", error)
    alert("Error selecting output folder. Please try again.")
  }
}

function displaySelectedFiles() {
  selectedFilesDiv.innerHTML = ""
  if (selectedFiles.length === 0) {
    selectedFilesDiv.innerHTML = '<p style="color: #666; font-style: italic;">No files selected</p>'
    return
  }

  selectedFiles.forEach((file) => {
    const fileItem = document.createElement("div")
    fileItem.className = "file-item"
    fileItem.textContent = file
    selectedFilesDiv.appendChild(fileItem)
  })

  const summary = document.createElement("div")
  summary.style.marginTop = "10px"
  summary.style.fontWeight = "bold"
  summary.style.color = "#667eea"
  summary.textContent = `${selectedFiles.length} file(s) selected`
  selectedFilesDiv.appendChild(summary)
}

function displayOutputFolder() {
  outputFolderDiv.innerHTML = ""
  if (!outputFolder) {
    outputFolderDiv.innerHTML = '<p style="color: #666; font-style: italic;">No output folder selected</p>'
    return
  }

  outputFolderDiv.textContent = outputFolder
}

function checkReadyToConvert() {
  const ready = selectedFiles.length > 0 && outputFolder && !isConverting
  convertBtn.disabled = !ready
}

async function convertFiles() {
  if (isConverting || selectedFiles.length === 0 || !outputFolder) {
    return
  }

  isConverting = true
  convertBtn.disabled = true
  convertBtn.textContent = "⏳ Converting..."

  // Show progress section
  progressSection.style.display = "block"
  results.style.display = "none"
  progressBar.style.width = "0%"
  progressText.textContent = "Starting conversion..."

  try {
    const conversionData = {
      inputFiles: selectedFiles,
      outputFolder: outputFolder,
      quality: parseInt(qualitySlider.value),
    }

    const conversionResults = await window.electronAPI.convertFiles(conversionData)
    displayResults(conversionResults)
  } catch (error) {
    console.error("Conversion error:", error)
    alert("An error occurred during conversion. Please try again.")
  } finally {
    isConverting = false
    convertBtn.disabled = false
    convertBtn.textContent = "🔄 Convert Files"
    checkReadyToConvert()
  }
}

function updateProgress(completed, total, currentFile) {
  const percentage = (completed / total) * 100
  progressBar.style.width = percentage + "%"
  progressText.textContent = `Converting: ${currentFile} (${completed}/${total})`
}

function displayResults(conversionResults) {
  results.style.display = "block"
  resultsList.innerHTML = ""

  const successCount = conversionResults.filter((r) => r.success).length
  const totalCount = conversionResults.length

  // Summary
  const summary = document.createElement("div")
  summary.style.marginBottom = "20px"
  summary.style.padding = "15px"
  summary.style.borderRadius = "8px"
  summary.style.fontWeight = "bold"

  if (successCount === totalCount) {
    summary.style.background = "#d4edda"
    summary.style.color = "#155724"
    summary.textContent = `✅ All ${totalCount} files converted successfully!`
  } else {
    summary.style.background = "#fff3cd"
    summary.style.color = "#856404"
    summary.textContent = `⚠️ ${successCount}/${totalCount} files converted successfully`
  }

  resultsList.appendChild(summary)

  // Individual results
  conversionResults.forEach((result) => {
    const resultItem = document.createElement("div")
    resultItem.className = `result-item ${result.success ? "success" : "error"}`

    const fileName = result.inputFile.split(/[\\\/]/).pop()
    const message = result.success ? "Converted successfully" : result.message

    resultItem.innerHTML = `
            <div>
                <strong>${fileName}</strong><br>
                <small>${message}</small>
            </div>
            <div class="result-status">${result.success ? "✅" : "❌"}</div>
        `

    resultsList.appendChild(resultItem)
  })

  // Final progress update
  progressBar.style.width = "100%"
  progressText.textContent = `Conversion complete! ${successCount}/${totalCount} files processed.`
}

// Initialize display
displaySelectedFiles()
displayOutputFolder()
checkReadyToConvert()
