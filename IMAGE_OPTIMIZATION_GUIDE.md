# Image Optimization Guide

This guide will help you optimize images for the Field of Command website to improve loading performance.

## Why Optimize Images?

- **Faster loading times**: WebP images are 25-35% smaller than PNG/JPG
- **Better user experience**: Reduced bandwidth usage, especially on mobile
- **Improved SEO**: Google prioritizes fast-loading sites
- **Lower hosting costs**: Smaller files mean less bandwidth usage

## Current Image Inventory

Based on the site structure, you have images in:
- `/images/` - Main marketing images
- `/images/timeline/` - Campaign timeline images (1940-1945)

## Recommended Optimization Strategy

### Option 1: Automated Conversion Script (Recommended)

Use this Node.js script to batch convert all images to WebP:

```bash
# Install sharp (image processing library)
npm install sharp

# Create conversion script
cat > convert-to-webp.js << 'EOF'
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = './images';
const quality = 85; // Adjust quality (1-100, 85 is recommended)

function convertToWebP(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const webpPath = filePath.replace(ext, '.webp');

  sharp(filePath)
    .webp({ quality })
    .toFile(webpPath)
    .then(() => {
      const originalSize = fs.statSync(filePath).size;
      const webpSize = fs.statSync(webpPath).size;
      const saved = ((1 - webpSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${path.basename(filePath)} → ${saved}% smaller`);
    })
    .catch(err => console.error(`✗ ${filePath}:`, err.message));
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else {
      convertToWebP(fullPath);
    }
  });
}

processDirectory(imageDir);
EOF

# Run the conversion
node convert-to-webp.js
```

### Option 2: Online Tools (Quick & Easy)

For individual images:
- **Squoosh**: https://squoosh.app/ (Google's free tool)
- **CloudConvert**: https://cloudconvert.com/png-to-webp
- **TinyPNG**: https://tinypng.com/ (also does JPG/PNG compression)

### Option 3: CLI Tool (For Power Users)

```bash
# Install cwebp (WebP encoder)
# macOS:
brew install webp

# Ubuntu/Debian:
sudo apt-get install webp

# Convert single image
cwebp -q 85 images/command.png -o images/command.webp

# Batch convert all PNGs in a directory
for file in images/**/*.png; do
  cwebp -q 85 "$file" -o "${file%.png}.webp"
done

# Batch convert all JPGs
for file in images/**/*.jpg; do
  cwebp -q 85 "$file" -o "${file%.jpg}.webp"
done
```

## Implementation Steps

### 1. Create WebP versions (keep originals as fallback)

```bash
# Don't delete original files - keep them as fallback for older browsers
```

### 2. Update HTML to use WebP with fallback

Replace:
```html
<img src="images/command.png" alt="Tactical Map">
```

With:
```html
<picture>
  <source srcset="images/command.webp" type="image/webp">
  <img src="images/command.png" alt="Tactical Map">
</picture>
```

### 3. Test browser support

WebP is supported by:
- ✓ Chrome 32+
- ✓ Firefox 65+
- ✓ Safari 14+
- ✓ Edge 18+

Coverage: ~95% of users

## Expected Results

Based on typical image optimization:

| Image Type | Original Size | WebP Size | Savings |
|------------|--------------|-----------|---------|
| PNG (screenshots) | 500 KB | 150 KB | 70% |
| JPG (photos) | 300 KB | 210 KB | 30% |
| PNG (graphics) | 200 KB | 80 KB | 60% |

**Total estimated savings: 50-60% reduction in image bandwidth**

## Advanced: Responsive Images

For even better performance, create multiple sizes:

```bash
# Create 3 sizes for responsive images
sharp command.png --resize 400 --output command-400.webp
sharp command.png --resize 800 --output command-800.webp
sharp command.png --resize 1200 --output command-1200.webp
```

Then use:
```html
<picture>
  <source
    srcset="images/command-400.webp 400w,
            images/command-800.webp 800w,
            images/command-1200.webp 1200w"
    sizes="(max-width: 768px) 400px, 800px"
    type="image/webp">
  <img src="images/command.png" alt="Tactical Map">
</picture>
```

## Quick Start (Do This Now)

1. Install sharp: `npm install sharp`
2. Run the conversion script above
3. Test locally to ensure all images load
4. Deploy to Cloudflare Pages
5. Test on staging before production

## Monitoring

After optimization, check performance:
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

Target metrics:
- Largest Contentful Paint (LCP): < 2.5s
- Total page weight: < 1MB
- Image weight: < 500KB

## Questions?

- WebP Browser Support: https://caniuse.com/webp
- Sharp Documentation: https://sharp.pixelplumbing.com/
- Image Optimization Guide: https://web.dev/fast/#optimize-your-images
