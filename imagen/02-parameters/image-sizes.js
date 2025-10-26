import { generateImages, saveImage, createTimestampFilename } from '../utils/imagen-helper.js';

async function imageSizesExample() {
  console.log('📏 Image Sizes Example\n');

  const prompt = "A futuristic city skyline with flying cars at twilight";
  const sizes = ['1K', '2K'];

  for (const size of sizes) {
    console.log(`\n🔍 Generating ${size} resolution image`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(prompt, {
        numberOfImages: 1,
        imageSize: size,
        aspectRatio: "16:9"
      });

      console.log(`✨ Successfully generated ${size} image`);

      const filename = createTimestampFilename(`size_${size}`);
      const savedPath = await saveImage(images[0], filename, '02-parameters');
      console.log(`📁 Saved to: ${savedPath}`);
      console.log(`   Resolution: ${size === '1K' ? '1024px' : '2048px'} width`);

    } catch (error) {
      console.error(`❌ Failed for size ${size}: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n✅ Image sizes example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  imageSizesExample().catch(console.error);
}