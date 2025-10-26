import fs from 'fs';
import path from 'path';
import { genAI, IMAGE_GENERATION_CONFIG, OUTPUT_DIR } from '../config.js';

export async function generateImages(prompt, options = {}) {
  try {
    const config = {
      numberOfImages: options.numberOfImages || IMAGE_GENERATION_CONFIG.defaultParams.numberOfImages,
      aspectRatio: options.aspectRatio || IMAGE_GENERATION_CONFIG.defaultParams.aspectRatio
    };

    if (options.safetyFilterLevel) {
      config.safetyFilterLevel = options.safetyFilterLevel;
    }

    console.log('🎨 Generating images with config:', { ...config, prompt });

    const response = await genAI.models.generateImages({
      model: options.model || IMAGE_GENERATION_CONFIG.model,
      prompt: prompt,
      config: config
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error('No images were generated');
    }

    const images = response.generatedImages.map(img => img.image.imageBytes);
    return images;
  } catch (error) {
    console.error('❌ Image generation failed:', error.message);
    throw error;
  }
}

export async function saveImage(imageData, filename, subdirectory = '') {
  try {
    const outputPath = path.join(OUTPUT_DIR, subdirectory);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const filePath = path.join(outputPath, filename);

    const buffer = Buffer.from(imageData, 'base64');
    fs.writeFileSync(filePath, buffer);

    console.log(`✅ Image saved: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('❌ Failed to save image:', error.message);
    throw error;
  }
}

export function createTimestampFilename(prefix = 'image', extension = 'png') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `${prefix}_${timestamp}.${extension}`;
}

export function enhancePrompt(basePrompt, style = null, modifiers = []) {
  let enhancedPrompt = basePrompt;

  if (style) {
    enhancedPrompt = `${basePrompt}, ${style}`;
  }

  if (modifiers.length > 0) {
    enhancedPrompt = `${enhancedPrompt}, ${modifiers.join(', ')}`;
  }

  return enhancedPrompt;
}

export const STYLE_PRESETS = {
  photographic: "photorealistic, high detail, professional photography, 8K resolution",
  artistic: "artistic style, painted, creative interpretation, vibrant colors",
  abstract: "abstract art, non-representational, geometric shapes, modern art",
  vintage: "vintage style, retro, old-fashioned, sepia tones, nostalgic",
  minimalist: "minimalist design, simple, clean lines, negative space",
  cyberpunk: "cyberpunk style, neon lights, futuristic, dark atmosphere",
  fantasy: "fantasy art, magical, ethereal, dreamlike quality"
};

export const QUALITY_MODIFIERS = {
  high: "ultra high quality, masterpiece, best quality",
  detailed: "extremely detailed, intricate details, fine details",
  cinematic: "cinematic lighting, dramatic composition, movie still"
};

export async function batchGenerateImages(prompts, options = {}) {
  const results = [];

  for (const [index, prompt] of prompts.entries()) {
    console.log(`\n📸 Processing ${index + 1}/${prompts.length}: "${prompt}"`);

    try {
      const images = await generateImages(prompt, options);
      results.push({
        prompt,
        images,
        success: true
      });

      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      results.push({
        prompt,
        error: error.message,
        success: false
      });
    }
  }

  return results;
}

export function displayResults(results) {
  console.log('\n📊 Generation Results:');
  console.log('='.repeat(50));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\nFailed prompts:');
    failed.forEach(f => {
      console.log(`  - "${f.prompt}": ${f.error}`);
    });
  }
}