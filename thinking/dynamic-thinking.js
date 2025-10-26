import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

async function dynamicThinkingDemo() {
  console.log("Dynamic Thinking Mode Demo");
  console.log("===========================\n");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
    generationConfig: {
      temperature: 0.9,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  // 다양한 복잡도의 질문들
  const questions = [
    {
      category: "🟢 간단한 질문",
      text: "오늘 날씨가 좋나요?",
      expectedThinking: "낮음"
    },
    {
      category: "🟡 중간 난이도",
      text: "객체 지향 프로그래밍의 SOLID 원칙을 설명하고 각각의 예시를 들어주세요.",
      expectedThinking: "중간"
    },
    {
      category: "🔴 복잡한 문제",
      text: `
        한 도시의 교통 체증을 해결하기 위한 종합적인 계획을 수립하세요.
        다음을 고려해야 합니다:
        - 현재 인프라의 제약
        - 예산 한계 (100억원)
        - 환경 영향 최소화
        - 5년 내 실행 가능성
        - 시민들의 편의성
        구체적인 실행 단계와 예상 효과를 포함하세요.
      `,
      expectedThinking: "높음"
    },
    {
      category: "🧮 수학적 추론",
      text: `
        한 연못에 수련이 있습니다. 수련은 매일 2배로 증가합니다.
        30일째에 연못이 완전히 덮인다면:
        1) 연못의 절반이 덮이는 날은 언제일까요?
        2) 연못의 1/4이 덮이는 날은?
        3) 첫날 수련이 연못의 몇 %를 차지했을까요?
        각 답에 대한 수학적 설명을 포함하세요.
      `,
      expectedThinking: "높음"
    },
    {
      category: "💻 알고리즘 최적화",
      text: `
        1억 개의 정수가 들어있는 배열에서 상위 100개의 값을 찾는 
        가장 효율적인 알고리즘을 설계하세요.
        메모리 제약: 1GB
        시간 제약: 1초 이내
        여러 접근 방법을 비교하고 최적 해법을 제시하세요.
      `,
      expectedThinking: "매우 높음"
    }
  ];

  console.log("동적 Thinking 모드는 질문의 복잡도에 따라");
  console.log("자동으로 thinking budget을 조절합니다.\n");
  console.log("=" * 60 + "\n");

  for (const q of questions) {
    console.log(`${q.category}`);
    console.log(`질문: ${q.text.substring(0, 100)}...`);
    console.log(`예상 Thinking 수준: ${q.expectedThinking}\n`);
    
    const chat = model.startChat({
      generationConfig: {
        thinkingBudget: -1, // 동적 thinking 활성화
      },
    });

    const startTime = Date.now();
    
    try {
      console.log("🤔 모델이 생각 중...\n");
      
      const result = await chat.sendMessageStream(q.text);
      
      let fullResponse = "";
      let chunkCount = 0;
      
      // 스트리밍 응답 처리
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkCount < 5) { // 처음 몇 청크만 표시
          process.stdout.write(chunkText);
        } else if (chunkCount === 5) {
          console.log("\n... [응답 계속됨] ...\n");
        }
        fullResponse += chunkText;
        chunkCount++;
      }
      
      const endTime = Date.now();
      const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
      
      // 응답 통계
      const response = await result.response;
      const metadata = response.usageMetadata;
      
      console.log("\n" + "-".repeat(60));
      console.log("📊 통계:");
      console.log(`  처리 시간: ${elapsedTime}초`);
      
      if (metadata) {
        console.log(`  프롬프트 토큰: ${metadata.promptTokenCount}`);
        console.log(`  응답 토큰: ${metadata.candidatesTokenCount}`);
        console.log(`  전체 토큰: ${metadata.totalTokenCount}`);
        
        // Thinking 강도 추정 (토큰 수 기반)
        const thinkingIntensity = estimateThinkingIntensity(metadata.totalTokenCount);
        console.log(`  추정 Thinking 강도: ${thinkingIntensity}`);
      }
      
      console.log("\n" + "=".repeat(60) + "\n");
      
    } catch (error) {
      console.error(`오류 발생: ${error.message}\n`);
    }
    
    // API 제한 방지
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

function estimateThinkingIntensity(totalTokens) {
  if (totalTokens < 500) return "⚪ 최소";
  if (totalTokens < 2000) return "🟢 낮음";
  if (totalTokens < 5000) return "🟡 중간";
  if (totalTokens < 10000) return "🟠 높음";
  return "🔴 매우 높음";
}

async function adaptiveThinkingExample() {
  console.log("\n" + "=".repeat(60));
  console.log("적응형 Thinking 예제");
  console.log("=".repeat(60) + "\n");
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
  });

  // 점진적으로 복잡해지는 대화
  const conversation = [
    "안녕하세요!",
    "1 + 1은 뭐죠?",
    "피보나치 수열의 10번째 항은?",
    "퀵 정렬 알고리즘을 구현해주세요.",
    "P vs NP 문제에 대해 설명하고, 만약 P=NP가 증명된다면 어떤 영향이 있을지 논의해주세요.",
  ];

  const chat = model.startChat({
    generationConfig: {
      thinkingBudget: -1, // 동적 모드
      temperature: 0.8,
      maxOutputTokens: 8192,
    },
  });

  console.log("대화가 진행될수록 복잡도가 증가합니다.\n");
  console.log("동적 Thinking이 어떻게 적응하는지 관찰하세요.\n");
  console.log("-".repeat(60) + "\n");

  for (let i = 0; i < conversation.length; i++) {
    const message = conversation[i];
    console.log(`👤 사용자: ${message}`);
    
    const startTime = Date.now();
    const result = await chat.sendMessage(message);
    const endTime = Date.now();
    
    const response = result.response.text();
    const metadata = result.response.usageMetadata;
    
    console.log(`🤖 AI: ${response.substring(0, 200)}...`);
    console.log(`⏱️ 시간: ${((endTime - startTime) / 1000).toFixed(2)}초`);
    
    if (metadata) {
      console.log(`📊 토큰: ${metadata.totalTokenCount}`);
    }
    
    console.log("-".repeat(60) + "\n");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function main() {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    console.log("환경 변수 설정: export GEMINI_API_KEY='your-api-key'");
    process.exit(1);
  }

  // 기본 동적 thinking 데모
  await dynamicThinkingDemo();
  
  // 적응형 thinking 예제
  await adaptiveThinkingExample();
  
  console.log("\n✅ Dynamic Thinking 데모 완료!");
  console.log("\n핵심 포인트:");
  console.log("- 동적 모드(-1)는 질문 복잡도에 따라 자동 조절");
  console.log("- 간단한 질문은 적은 thinking, 복잡한 문제는 많은 thinking");
  console.log("- 효율성과 품질의 균형을 자동으로 맞춤");
}

// 실행
main().catch(console.error);