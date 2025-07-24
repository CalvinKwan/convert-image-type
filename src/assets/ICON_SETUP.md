# Icon Setup Instructions

To add proper icons to your application, you'll need to create icon files in different formats:

## Required Icon Files:

### For Windows (.ico):

- `src/assets/icon.ico` - Windows icon file (16x16, 32x32, 48x48, 256x256)

### For macOS (.icns):

- `src/assets/icon.icns` - macOS icon file (multiple sizes)

### For Linux (.png):

- `src/assets/icon.png` - PNG icon file (512x512 recommended)

## How to Create Icons:

1. **Design your icon** - Create a 1024x1024 PNG image with your app logo
2. **Convert to required formats:**

   **For Windows (.ico):**

   - Use online converters like favicon.io or iconifier.net
   - Or use tools like ImageMagick: `magick icon.png icon.ico`

   **For macOS (.icns):**

   - Use online converters or Icon Composer (part of Xcode)
   - Or use iconutil on macOS: `iconutil -c icns icon.iconset`

## Temporary Solution:

For now, the app will build without custom icons using default Electron icons.

## Icon Design Tips:

- Use simple, recognizable symbols (camera, image, conversion arrows)
- Ensure it looks good at small sizes (16x16)
- Use high contrast colors
- Consider the HEIC/JPG conversion theme
