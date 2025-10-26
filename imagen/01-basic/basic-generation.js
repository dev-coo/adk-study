import { generateImages, saveImage, createTimestampFilename } from '../utils/imagen-helper.js';

async function basicImageGeneration() {
  console.log('🚀 Basic Image Generation Example\n');

  const prompts = [
    "A cute robot holding a red flower in a sunny garden",
    "A majestic mountain landscape at sunset with snow-capped peaks",
    "A modern coffee shop interior with warm lighting and plants"
  ];

  for (const prompt of prompts) {
    console.log(`\n📝 Generating image for: "${prompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(prompt, {
        numberOfImages: 1,
        aspectRatio: "1:1"
      });

      console.log(`✨ Successfully generated ${images.length} image(s)`);

      for (let i = 0; i < images.length; i++) {
        const filename = createTimestampFilename(`basic_${i + 1}`);
        const savedPath = await saveImage(images[i], filename, '01-basic');
        console.log(`📁 Saved to: ${savedPath}`);
      }

    } catch (error) {
      console.error(`❌ Failed to generate image: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n✅ Basic generation example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  basicImageGeneration().catch(console.error);
}