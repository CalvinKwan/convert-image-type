# 🍎 macOS Build Instructions

## Step-by-Step Guide for Building on Mac:

### 1. Transfer Project to Mac

```bash
# Option A: Using Git (recommended)
git clone [your-repo-url]
cd convert-image-type

# Option B: If you copied files manually
cd /path/to/convert-image-type
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build for macOS

```bash
npm run build-mac
```

### 4. Expected Output

After successful build, you'll see:

```
✓ Building for macOS
✓ Packaging app for x64 architecture
✓ Packaging app for arm64 architecture
✓ Creating DMG installer files
✓ Build completed successfully!
```

### 5. Generated Files (in dist/ folder):

- `HEIC to JPG Converter-1.0.0-mac-x64.dmg` (Intel Macs)
- `HEIC to JPG Converter-1.0.0-mac-arm64.dmg` (Apple Silicon)

### 6. Distribution:

- **Intel Macs**: Share the x64.dmg file
- **Apple Silicon**: Share the arm64.dmg file
- **Universal**: Both files support all Mac users

### 7. Installation for Users:

1. Download the appropriate .dmg file
2. Double-click to mount the disk image
3. Drag "HEIC to JPG Converter" to Applications folder
4. Launch from Applications

### 8. First Launch Note:

Mac users may see a security warning on first launch:

- Right-click the app → "Open"
- Or: System Preferences → Security & Privacy → "Open Anyway"

### 9. Build Time:

- First build: 5-10 minutes (downloads Electron)
- Subsequent builds: 2-3 minutes

## Troubleshooting:

### If build fails:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build-mac
```

### For Apple Silicon Macs:

The build automatically creates both Intel and ARM versions, so it works on all Macs!

## That's it! 🎉

Your app will be ready for Mac users to install and use!
