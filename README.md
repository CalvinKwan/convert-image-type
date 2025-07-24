# 🖼️ HEIC to JPG Converter

A beautiful, cross-platform desktop application that converts HEIC images to JPG format with an intuitive user interface.

## ✨ Features

- 🖼️ **Batch Conversion**: Convert multiple HEIC files to JPG in one go
- 🎛️ **Quality Control**: Adjustable JPEG quality from 10% to 100%
- 📁 **Easy File Selection**: Drag and drop or browse for files
- 🖥️ **Cross-Platform**: Works on both Windows and macOS
- 📊 **Progress Tracking**: Real-time conversion progress with detailed results
- ✅ **Error Handling**: Clear feedback for successful and failed conversions
- 🎨 **Modern UI**: Clean, responsive interface with smooth animations

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the project
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

```bash
npm start
```

### Development Mode

To run with developer tools:

```bash
npm run dev
```

## 📦 Building for Distribution

### Windows

```bash
npm run build-win
```

### macOS

```bash
npm run build-mac
```

### Both Platforms

```bash
npm run build
```

Built applications will be in the `dist/` folder.

## 🎯 How to Use

1. **Select HEIC Files**: Click "Choose HEIC Files" to select one or more HEIC images
2. **Choose Output Folder**: Select where you want the converted JPG files to be saved
3. **Adjust Quality**: Use the slider to set JPEG quality (85% recommended for best balance)
4. **Convert**: Click "Convert Files" to start the conversion process
5. **View Results**: Monitor progress and see detailed results for each file

## 🔧 Technical Details

### Built With

- **Electron**: Cross-platform desktop app framework
- **heic-convert**: HEIC to JPEG conversion library
- **Node.js**: JavaScript runtime
- **HTML/CSS/JavaScript**: Modern web technologies

### Architecture

- **Main Process** (`src/main.js`): Handles file operations and conversion logic
- **Renderer Process** (`src/renderer.js`): Manages the user interface
- **Preload Script** (`src/preload.js`): Secure communication bridge
- **Security**: Context isolation and no node integration in renderer

### Supported Formats

- **Input**: `.heic`, `.HEIC` files (HEIF format)
- **Output**: `.jpg` files (JPEG format)

## 🛠️ Development

### Project Structure

```
src/
├── main.js          # Main Electron process
├── preload.js       # Preload script for secure IPC
├── index.html       # User interface
├── styles.css       # Application styling
├── renderer.js      # Frontend logic
└── assets/          # Icons and resources
```

### Scripts

- `npm start`: Run the application
- `npm run dev`: Run with developer tools
- `npm run build`: Build for all platforms
- `npm run build-win`: Build for Windows
- `npm run build-mac`: Build for macOS

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

**Application won't start**

- Ensure Node.js and npm are installed
- Run `npm install` to install dependencies

**Conversion fails**

- Verify input files are valid HEIC format
- Ensure output folder has write permissions
- Check available disk space

**Build issues**

- Clear node_modules and reinstall: `npm install`
- Update dependencies: `npm update`

---

Made with ❤️ for photographers and anyone dealing with HEIC files!
