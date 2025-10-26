import { generateImages, saveImage, createTimestampFilename, enhancePrompt, STYLE_PRESETS } from '../utils/imagen-helper.js';

async function photographicStyleExample() {
  console.log('📸 Photographic Style Example\n');

  const subjects = [
    {
      name: "portrait",
      base: "A professional businesswoman in a modern office",
      modifiers: [
        "portrait photography",
        "85mm lens",
        "shallow depth of field",
        "soft natural lighting",
        "professional headshot"
      ]
    },
    {
      name: "landscape",
      base: "Mountain range with a lake in foreground",
      modifiers: [
        "landscape photography",
        "wide angle lens",
        "f/11 aperture",
        "golden hour",
        "high dynamic range",
        "ultra sharp"
      ]
    },
    {
      name: "street",
      base: "Busy Tokyo street at night with neon signs",
      modifiers: [
        "street photography",
        "35mm lens",
        "candid shot",
        "neon lighting",
        "rain-wet streets",
        "cinematic mood"
      ]
    },
    {
      name: "macro",
      base: "Dewdrops on a spider web",
      modifiers: [
        "macro photography",
        "extreme close-up",
        "100mm macro lens",
        "shallow DOF",
        "morning light",
        "crystal clear detail"
      ]
    },
    {
      name: "wildlife",
      base: "Eagle catching fish from river",
      modifiers: [
        "wildlife photography",
        "telephoto lens",
        "action shot",
        "frozen motion",
        "natural habitat",
        "National Geographic style"
      ]
    }
  ];

  for (const subject of subjects) {
    const enhancedPrompt = enhancePrompt(
      subject.base,
      STYLE_PRESETS.photographic,
      subject.modifiers
    );

    console.log(`\n📷 Photography Type: ${subject.name.toUpperCase()}`);
    console.log(`📝 Full Prompt: "${enhancedPrompt}"`);
    console.log('-'.repeat(50));

    try {
      const images = await generateImages(enhancedPrompt, {
        numberOfImages: 1,
        aspectRatio: subject.name === 'landscape' ? '16:9' : '3:4'
      });

      console.log('✨ Photographic image generated');

      const filename = createTimestampFilename(`photo_${subject.name}`);
      const savedPath = await saveImage(images[0], filename, '04-styles');
      console.log(`📁 Saved to: ${savedPath}`);

    } catch (error) {
      console.error(`❌ Failed: ${error.message}`);
    }

    console.log('Waiting before next request...');
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n📸 Photography Tips:');
  console.log('  • Specify camera settings (aperture, ISO, shutter speed)');
  console.log('  • Mention lens type for desired perspective');
  console.log('  • Include lighting conditions');
  console.log('  • Add composition rules (rule of thirds, leading lines)');
  console.log('  • Reference photography styles or famous photographers');

  console.log('\n✅ Photographic style example completed!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  photographicStyleExample().catch(console.error);
}