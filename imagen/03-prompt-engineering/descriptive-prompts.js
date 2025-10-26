import { generateImages, saveImage, createTimestampFilename } from '../utils/imagen-helper.js';

async function descriptivePromptsExample() {
  console.log('📝 Descriptive Prompts Example\n');
  console.log('Demonstrating how detail level affects image generation\n');

  const promptVariations = [
    {
      level: "basic",
      prompt: "A cat"
    },
    {
      level: "moderate",
      prompt: "A fluffy orange cat sitting on a windowsill"
    },
    {
      level: "detailed",
      prompt: "A fluffy orange tabby cat with green eyes, sitting on a wooden windowsill, looking outside at falling rain, warm indoor lighting, cozy atmosphere"
    },
    {
      level: "highly_detailed",
      prompt: "A majestic fluffy orange tabby cat with bright emerald green eyes and white paws, sitting gracefully on a vintage wooden windowsill with peeling white paint, gazing thoughtfully through rain-streaked glass at a misty garden, warm golden hour lighting from inside creating a cozy atmosphere, photorealistic style, shallow depth of field"
    }
  ];

  for (const variation of promptVariations) {
    console.log(`\n🎨 Level: ${variation.level.toUpperCase()}`);
    console.log(`📝 Prompt: "${variation.prompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(variation.prompt, {
        numberOfImages: 1,
        aspectRatio: "4:3"
      });

      console.log('✨ Image generated successfully');

      const filename = createTimestampFilename(`descriptive_${variation.level}`);
      const savedPath = await saveImage(images[0], filename, '03-prompt-engineering');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n💡 Tips for Better Prompts:');
  console.log('  1. Include specific details about subject, setting, and mood');
  console.log('  2. Mention lighting conditions (golden hour, soft light, dramatic)');
  console.log('  3. Specify camera angles and composition');
  console.log('  4. Add style references (photorealistic, artistic, etc.)');
  console.log('  5. Include atmospheric details for mood');

  console.log('\n✅ Descriptive prompts example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  descriptivePromptsExample().catch(console.error);
}