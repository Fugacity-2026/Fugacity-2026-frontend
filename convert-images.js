import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const folder = './public/team';
const files = fs.readdirSync(folder);

files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    const inputPath = path.join(folder, file);
    const outputPath = path.join(folder, path.basename(file, ext) + '.webp');
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Converted: ${file} -> ${path.basename(outputPath)}`))
      .catch((err) => console.error(`Error converting ${file}:`, err));
  }
});