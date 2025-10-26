import aiClient from "./utils/api-client.js";
import * as fs from "node:fs";

async function main() {
  try {

    console.log("🎨 이미지 생성 시작...");

    const response = await aiClient.generateImages('한국적인 배경의 도시');

    console.log("📥 응답 받음:", response);

    if (!response.generatedImages || response.generatedImages.length === 0) {
      console.log("❌ 생성된 이미지가 없습니다");
      return;
    }

    let idx = 1;
    for (const generatedImage of response.generatedImages) {
      let imgBytes = generatedImage.image.imageBytes;
      const buffer = Buffer.from(imgBytes, "base64");
      const filename = `imagen-${idx}.png`;
      fs.writeFileSync(filename, buffer);
      console.log(`✅ 이미지 저장됨: ${filename}`);
      idx++;
    }

    console.log(`🎉 총 ${idx - 1}개 이미지 생성 완료!`);

  } catch (error) {
    console.error("❌ 오류 발생:", error.message || error);
    if (error.response) {
      console.error("응답 내용:", error.response);
    }
  }
}

main();