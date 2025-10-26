import { generateImages, saveImage, createTimestampFilename, enhancePrompt, QUALITY_MODIFIERS } from '../utils/imagen-helper.js';

async function styleModifiersExample() {
  console.log('🎨 Style Modifiers Example\n');
  console.log('Showing how modifiers transform the same base prompt\n');

  const basePrompt = "A vintage steam locomotive crossing a bridge at sunset";

  const modifierSets = [
    {
      name: "no_modifiers",
      modifiers: []
    },
    {
      name: "high_quality",
      modifiers: QUALITY_MODIFIERS.high.split(', ')
    },
    {
      name: "detailed",
      modifiers: QUALITY_MODIFIERS.detailed.split(', ')
    },
    {
      name: "cinematic",
      modifiers: QUALITY_MODIFIERS.cinematic.split(', ')
    },
    {
      name: "artistic_combo",
      modifiers: [
        "oil painting style",
        "impressionist",
        "vibrant colors",
        "visible brush strokes"
      ]
    },
    {
      name: "photography_combo",
      modifiers: [
        "shot on Canon EOS R5",
        "85mm lens",
        "f/1.4",
        "bokeh background",
        "golden hour lighting"
      ]
    }
  ];

  for (const set of modifierSets) {
    const enhancedPrompt = enhancePrompt(basePrompt, null, set.modifiers);

    console.log(`\n🔧 Modifier Set: ${set.name.toUpperCase()}`);
    console.log(`📝 Enhanced Prompt: "${enhancedPrompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(enhancedPrompt, {
        numberOfImages: 1,
        aspectRatio: "16:9"
      });

      console.log('✨ Image generated with modifiers');

      const filename = createTimestampFilename(`modifiers_${set.name}`);
      const savedPath = await saveImage(images[0], filename, '03-prompt-engineering');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n💡 Common Modifier Categories:');
  console.log('  📸 Photography: lens type, f-stop, ISO, camera model');
  console.log('  🎨 Art Style: oil painting, watercolor, sketch, digital art');
  console.log('  💡 Lighting: golden hour, studio lighting, neon, candlelight');
  console.log('  🎬 Cinematic: wide angle, close-up, aerial view, dutch angle');
  console.log('  🌈 Color: vibrant, muted, monochrome, pastel');

  console.log('\n✅ Style modifiers example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  styleModifiersExample().catch(console.error);
}