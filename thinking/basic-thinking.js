import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정 (환경 변수 또는 직접 입력)
const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE";

const genAI = new GoogleGenerativeAI(API_KEY);

async function basicThinkingExample() {
  console.log("=== Basic Thinking Example ===\n");
  
  // Thinking 모델 초기화
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  // Thinking budget을 설정한 채팅 세션 시작
  const chat = model.startChat({
    generationConfig: {
      temperature: 1,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      // Thinking 설정 - 4096 토큰 할당
      thinkingBudget: 4096,
    },
  });

  // 복잡한 질문 예시
  const questions = [
    "오컴의 면도날 원리를 설명하고, 실제 과학 연구에서 어떻게 적용되는지 예시를 들어주세요.",
    "체스에서 킹스 갬빗 오프닝의 장단점을 분석해주세요.",
    "재귀 함수와 반복문의 차이점을 설명하고, 각각 언제 사용하는 것이 좋은지 알려주세요."
  ];

  for (const question of questions) {
    console.log(`질문: ${question}\n`);
    console.log("생각 중...");
    
    try {
      // 스트리밍으로 응답 받기
      const result = await chat.sendMessageStream(question);
      
      console.log("\n답변:");
      let fullResponse = "";
      
      // 스트리밍 응답 처리
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        process.stdout.write(chunkText);
        fullResponse += chunkText;
      }
      
      console.log("\n");
      console.log("-".repeat(80));
      console.log("\n");
      
      // 응답 통계 (선택사항)
      const response = await result.response;
      if (response.usageMetadata) {
        console.log("토큰 사용량:");
        console.log(`  - 프롬프트 토큰: ${response.usageMetadata.promptTokenCount}`);
        console.log(`  - 응답 토큰: ${response.usageMetadata.candidatesTokenCount}`);
        console.log(`  - 전체 토큰: ${response.usageMetadata.totalTokenCount}`);
        console.log("\n");
      }
      
    } catch (error) {
      console.error("오류 발생:", error.message);
    }
  }
}

// 메인 실행
async function main() {
  console.log("Gemini Thinking Mode - Basic Example");
  console.log("=====================================\n");
  
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    console.log("환경 변수 설정: export GEMINI_API_KEY='your-api-key'");
    console.log("또는 코드에서 직접 입력하세요.\n");
    process.exit(1);
  }
  
  await basicThinkingExample();
}

// 실행
main().catch(console.error);