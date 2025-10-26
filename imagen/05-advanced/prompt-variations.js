import { generateImages, saveImage, createTimestampFilename, enhancePrompt, STYLE_PRESETS } from '../utils/imagen-helper.js';

async function promptVariationsExample() {
  console.log('🔄 Prompt Variations Example\n');
  console.log('Showing how variations of a base concept create different results\n');

  const baseTheme = "A lighthouse on a rocky coast";

  const variations = [
    {
      name: "time_morning",
      modifiers: ["at sunrise", "golden morning light", "calm seas", "birds flying"]
    },
    {
      name: "time_night",
      modifiers: ["at night", "stormy weather", "lightning in distance", "dramatic waves"]
    },
    {
      name: "season_summer",
      modifiers: ["summer day", "clear blue sky", "sailboats in distance", "bright colors"]
    },
    {
      name: "season_winter",
      modifiers: ["winter storm", "snow covered", "frozen waves", "moody atmosphere"]
    },
    {
      name: "style_photographic",
      style: STYLE_PRESETS.photographic,
      modifiers: ["wide angle lens", "long exposure", "silky water effect"]
    },
    {
      name: "style_artistic",
      style: STYLE_PRESETS.artistic,
      modifiers: ["oil painting", "impressionist style", "Van Gogh inspired"]
    },
    {
      name: "style_fantasy",
      style: STYLE_PRESETS.fantasy,
      modifiers: ["magical aura", "floating crystals", "ethereal glow", "mystical fog"]
    },
    {
      name: "style_cyberpunk",
      style: STYLE_PRESETS.cyberpunk,
      modifiers: ["holographic beacon", "neon lights", "futuristic modifications"]
    }
  ];

  console.log(`🎯 Base Theme: "${baseTheme}"\n`);

  for (const variation of variations) {
    const enhancedPrompt = enhancePrompt(
      baseTheme,
      variation.style || null,
      variation.modifiers
    );

    console.log(`\n🎨 Variation: ${variation.name.toUpperCase().replace('_', ' ')}`);
    console.log(`📝 Enhanced: "${enhancedPrompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(enhancedPrompt, {
        numberOfImages: 1,
        aspectRatio: "16:9"
      });

      console.log('✨ Variation generated successfully');

      const filename = createTimestampFilename(`variation_${variation.name}`);
      const savedPath = await saveImage(images[0], filename, '05-advanced');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next variation...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n💡 Variation Techniques:');
  console.log('  🕐 Time of Day: morning, noon, evening, night');
  console.log('  🌤️ Weather: sunny, cloudy, rainy, stormy, foggy');
  console.log('  🍂 Seasons: spring, summer, fall, winter');
  console.log('  🎨 Art Styles: photographic, painted, sketch, digital');
  console.log('  🌈 Color Schemes: vibrant, muted, monochrome, pastel');
  console.log('  📐 Perspectives: aerial, ground level, close-up, wide angle');

  console.log('\n✅ Prompt variations example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  promptVariationsExample().catch(console.error);
}