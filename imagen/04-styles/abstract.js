import { generateImages, saveImage, createTimestampFilename, enhancePrompt, STYLE_PRESETS } from '../utils/imagen-helper.js';

async function abstractStyleExample() {
  console.log('🌀 Abstract Style Example\n');

  const abstractConcepts = [
    {
      name: "geometric",
      base: "Interconnected geometric shapes floating in space",
      modifiers: [
        "abstract geometric art",
        "Bauhaus style",
        "primary colors",
        "clean lines",
        "mathematical precision",
        "minimalist composition"
      ]
    },
    {
      name: "fluid",
      base: "Liquid colors mixing and swirling",
      modifiers: [
        "fluid abstract art",
        "marble texture",
        "organic flow",
        "color gradients",
        "dynamic movement",
        "ethereal quality"
      ]
    },
    {
      name: "expressionist",
      base: "Emotional energy expressed through color and form",
      modifiers: [
        "abstract expressionism",
        "Jackson Pollock style",
        "paint splatters",
        "chaotic energy",
        "bold brushwork",
        "emotional intensity"
      ]
    },
    {
      name: "fractal",
      base: "Infinite patterns repeating at different scales",
      modifiers: [
        "fractal art",
        "mathematical beauty",
        "recursive patterns",
        "kaleidoscope effect",
        "complex geometry",
        "psychedelic colors"
      ]
    },
    {
      name: "minimalist",
      base: "Simple forms and negative space",
      modifiers: [
        "minimalist abstract",
        "Rothko inspired",
        "color field painting",
        "large blocks of color",
        "meditative quality",
        "subtle variations"
      ]
    }
  ];

  for (const concept of abstractConcepts) {
    const enhancedPrompt = enhancePrompt(
      concept.base,
      STYLE_PRESETS.abstract,
      concept.modifiers
    );

    console.log(`\n🎯 Abstract Type: ${concept.name.toUpperCase()}`);
    console.log(`📝 Full Prompt: "${enhancedPrompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(enhancedPrompt, {
        numberOfImages: 1,
        aspectRatio: "1:1"
      });

      console.log('✨ Abstract image generated');

      const filename = createTimestampFilename(`abstract_${concept.name}`);
      const savedPath = await saveImage(images[0], filename, '04-styles');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n🌀 Abstract Art Tips:');
  console.log('  • Focus on emotions, concepts, or sensations');
  console.log('  • Use color theory (complementary, analogous, etc.)');
  console.log('  • Describe movement and energy');
  console.log('  • Reference abstract art movements');
  console.log('  • Include texture and pattern descriptions');

  console.log('\n✅ Abstract style example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  abstractStyleExample().catch(console.error);
}