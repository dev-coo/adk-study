import { batchGenerateImages, saveImage, createTimestampFilename, displayResults } from '../utils/imagen-helper.js';

async function batchGenerationExample() {
  console.log('🚀 Batch Generation Example\n');
  console.log('Generating multiple images with different prompts efficiently\n');

  const batchPrompts = [
    "A steampunk airship floating above Victorian London",
    "Underwater city with bioluminescent architecture",
    "Desert oasis with magical glowing plants at night",
    "Ancient library with floating books and mystical lighting",
    "Futuristic Tokyo street with holographic advertisements",
    "Medieval castle on a floating island in the clouds",
    "Alien marketplace on a distant planet with multiple moons",
    "Enchanted forest with giant mushrooms and fairy lights"
  ];

  const batchConfig = {
    numberOfImages: 2,
    aspectRatio: "16:9",
    imageSize: "1K"
  };

  console.log(`📋 Processing ${batchPrompts.length} prompts`);
  console.log(`⚙️ Config: ${JSON.stringify(batchConfig)}`);
  console.log('='.repeat(50));

  try {
    const results = await batchGenerateImages(batchPrompts, batchConfig);

    console.log('\n💾 Saving generated images...\n');

    for (const result of results) {
      if (result.success) {
        console.log(`✅ "${result.prompt.substring(0, 40)}..."`);

        for (let i = 0; i < result.images.length; i++) {
          const filename = createTimestampFilename(
            `batch_${results.indexOf(result) + 1}_v${i + 1}`
          );
          const savedPath = await saveImage(
            result.images[i],
            filename,
            '05-advanced'
          );
          console.log(`   → Saved variant ${i + 1}: ${savedPath}`);
        }
      } else {
        console.log(`❌ Failed: "${result.prompt.substring(0, 40)}..."`);
        console.log(`   Error: ${result.error}`);
      }
    }

    displayResults(results);

    const totalImages = results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.images.length, 0);

    console.log(`\n📊 Total images generated: ${totalImages}`);

  } catch (error) {
    console.error(`\n❌ Batch generation failed: ${error.message}`);
  }

  console.log('\n✅ Batch generation example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  batchGenerationExample().catch(console.error);
}