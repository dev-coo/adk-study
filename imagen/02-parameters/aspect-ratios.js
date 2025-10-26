import { generateImages, saveImage, createTimestampFilename } from '../utils/imagen-helper.js';
import { SUPPORTED_ASPECT_RATIOS } from '../config.js';

async function aspectRatiosExample() {
  console.log('📐 Aspect Ratios Example\n');

  const basePrompt = "A serene Japanese zen garden with cherry blossoms";

  for (const ratio of SUPPORTED_ASPECT_RATIOS) {
    console.log(`\n🖼️ Generating image with aspect ratio ${ratio}`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(basePrompt, {
        numberOfImages: 1,
        aspectRatio: ratio
      });

      console.log(`✨ Successfully generated image with ${ratio} ratio`);

      const filename = createTimestampFilename(`aspect_${ratio.replace(':', 'x')}`);
      const savedPath = await saveImage(images[0], filename, '02-parameters');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed for ratio ${ratio}: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n✅ Aspect ratios example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  aspectRatiosExample().catch(console.error);
}