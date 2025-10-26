import { generateImages, saveImage, createTimestampFilename, enhancePrompt, STYLE_PRESETS } from '../utils/imagen-helper.js';

async function artisticStyleExample() {
  console.log('🎨 Artistic Style Example\n');

  const artStyles = [
    {
      name: "oil_painting",
      base: "A countryside cottage with flower garden",
      modifiers: [
        "oil painting on canvas",
        "impressionist style",
        "thick impasto technique",
        "visible brush strokes",
        "warm color palette",
        "Claude Monet inspired"
      ]
    },
    {
      name: "watercolor",
      base: "Venice canal with gondolas",
      modifiers: [
        "watercolor painting",
        "soft washes",
        "wet-on-wet technique",
        "translucent layers",
        "paper texture visible",
        "delicate and flowing"
      ]
    },
    {
      name: "digital_art",
      base: "Cyberpunk samurai warrior",
      modifiers: [
        "digital art illustration",
        "concept art style",
        "highly detailed",
        "dramatic lighting",
        "ArtStation trending",
        "matte painting"
      ]
    },
    {
      name: "pencil_sketch",
      base: "Old man reading newspaper on park bench",
      modifiers: [
        "pencil sketch",
        "graphite drawing",
        "cross-hatching shading",
        "detailed line work",
        "sketchbook style",
        "black and white"
      ]
    },
    {
      name: "pop_art",
      base: "Cat wearing sunglasses",
      modifiers: [
        "pop art style",
        "Andy Warhol inspired",
        "bold colors",
        "high contrast",
        "comic book aesthetic",
        "screen print effect"
      ]
    },
    {
      name: "art_nouveau",
      base: "Woman with flowing hair surrounded by flowers",
      modifiers: [
        "Art Nouveau style",
        "Alphonse Mucha inspired",
        "decorative borders",
        "organic flowing lines",
        "gold accents",
        "vintage poster aesthetic"
      ]
    }
  ];

  for (const style of artStyles) {
    const enhancedPrompt = enhancePrompt(
      style.base,
      STYLE_PRESETS.artistic,
      style.modifiers
    );

    console.log(`\n🖼️ Art Style: ${style.name.toUpperCase().replace('_', ' ')}`);
    console.log(`📝 Full Prompt: "${enhancedPrompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(enhancedPrompt, {
        numberOfImages: 1,
        aspectRatio: style.name === 'art_nouveau' ? '3:4' : '1:1'
      });

      console.log('✨ Artistic image generated');

      const filename = createTimestampFilename(`art_${style.name}`);
      const savedPath = await saveImage(images[0], filename, '04-styles');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n🎨 Artistic Style Tips:');
  console.log('  • Reference specific art movements or periods');
  console.log('  • Mention famous artists for style inspiration');
  console.log('  • Include medium and technique details');
  console.log('  • Specify color palettes or schemes');
  console.log('  • Add texture and material descriptions');

  console.log('\n✅ Artistic style example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  artisticStyleExample().catch(console.error);
}