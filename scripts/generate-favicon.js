#!/usr/bin/env node

/**
 * Generate favicon.ico from favicon.svg
 *
 * This script uses sharp to convert SVG to PNG at multiple sizes,
 * then combines them into a multi-resolution .ico file.
 */

const fs = require('fs');
const path = require('path');

const SVG_PATH = path.join(__dirname, '../apps/demo/public/favicon.svg');
const ICO_PATH = path.join(__dirname, '../apps/demo/public/favicon.ico');

console.log('📦 Generating favicon.ico from favicon.svg...');
console.log('');

// Check if sharp is installed
try {
  const sharp = require('sharp');

  async function generateFavicon() {
    try {
      // Read SVG
      const svgBuffer = fs.readFileSync(SVG_PATH);

      // Generate 32x32 PNG
      const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

      // For now, just use the 32x32 as .ico (browsers support PNG in .ico)
      fs.writeFileSync(ICO_PATH, png32);

      console.log('✅ Created favicon.ico');
      console.log('');
      console.log('📍 Location: apps/demo/public/favicon.ico');
      console.log('');
      console.log('✨ Done!');
    } catch (error) {
      console.error('❌ Error generating favicon:', error.message);
      process.exit(1);
    }
  }

  generateFavicon();
} catch {
  console.log('⚠️  Sharp is not installed.');
  console.log('');
  console.log('To generate favicon.ico, you have two options:');
  console.log('');
  console.log('Option 1: Install sharp and run this script');
  console.log('  npm install --save-dev sharp');
  console.log('  node scripts/generate-favicon.js');
  console.log('');
  console.log('Option 2: Use online converter');
  console.log('  1. Upload apps/demo/public/favicon.svg to:');
  console.log('     https://convertio.co/svg-ico/');
  console.log('  2. Download the .ico file');
  console.log('  3. Save as apps/demo/public/favicon.ico');
  console.log('');
  console.log('Option 3: Use ImageMagick (if installed)');
  console.log(
    '  convert -background none -resize 32x32 apps/demo/public/favicon.svg apps/demo/public/favicon.ico'
  );
  console.log('');
}
