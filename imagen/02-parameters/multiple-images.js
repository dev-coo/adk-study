import { generateImages, saveImage, createTimestampFilename } from '../utils/imagen-helper.js';

async function multipleImagesExample() {
  console.log('🎯 Multiple Images Generation Example\n');

  const prompt = "A magical forest with glowing mushrooms and fireflies at night";
  const numberOfVariations = [1, 2, 4];

  for (const count of numberOfVariations) {
    console.log(`\n📸 Generating ${count} image(s) for: "${prompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(prompt, {
        numberOfImages: count,
        aspectRatio: "16:9"
      });

      console.log(`✨ Generated ${images.length} variations`);

      for (let i = 0; i < images.length; i++) {
        const filename = createTimestampFilename(`multi_${count}_variant_${i + 1}`);
        const savedPath = await saveImage(images[i], filename, '02-parameters');
        console.log(`  Variant ${i + 1}: ${savedPath}`);
      }

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('\nWaiting before next batch...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n✅ Multiple images example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  multipleImagesExample().catch(console.error);
}