import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

async function generateCode(request, language = "javascript", thinkingBudget = -1) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  const chat = model.startChat({
    generationConfig: {
      thinkingBudget: thinkingBudget, // 동적 thinking이 기본
    },
    history: [
      {
        role: "user",
        parts: [{
          text: `당신은 전문 프로그래머입니다. 주어진 요구사항에 따라 ${language} 코드를 작성해주세요.
          코드는 다음 기준을 만족해야 합니다:
          1. 클린 코드 원칙 준수
          2. 에러 처리 포함
          3. 주석으로 핵심 로직 설명
          4. 시간/공간 복잡도 분석 포함`
        }],
      },
      {
        role: "model",
        parts: [{
          text: "네, 이해했습니다. 요구사항에 맞는 고품질 코드를 작성하겠습니다."
        }],
      },
    ],
  });

  console.log(`📝 요구사항: ${request}`);
  console.log(`💻 언어: ${language}`);
  console.log(`🧠 Thinking Budget: ${thinkingBudget === -1 ? "Dynamic" : thinkingBudget}`);
  console.log("\n코드 생성 중...\n");

  try {
    const result = await chat.sendMessageStream(
      `${language}로 다음을 구현해주세요: ${request}`
    );
    
    console.log("=".repeat(80));
    console.log("생성된 코드:\n");
    
    let fullResponse = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
      fullResponse += chunkText;
    }
    
    console.log("\n" + "=".repeat(80));
    
    // 토큰 사용량
    const response = await result.response;
    if (response.usageMetadata) {
      console.log(`\n토큰 사용량: ${response.usageMetadata.totalTokenCount}`);
    }
    
    return fullResponse;
  } catch (error) {
    console.error("오류 발생:", error.message);
    return null;
  }
}

async function main() {
  console.log("Gemini Thinking Mode - Code Generator");
  console.log("======================================\n");
  
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    process.exit(1);
  }

  // 다양한 코딩 과제들
  const codingTasks = [
    {
      request: "이진 탐색 트리(BST) 구현. 삽입, 삭제, 검색, 중위 순회 메서드 포함",
      language: "javascript",
      budget: 12288
    },
    {
      request: "LRU(Least Recently Used) 캐시 구현. get과 put 메서드는 O(1) 시간 복잡도를 가져야 함",
      language: "javascript",
      budget: 16384
    },
    {
      request: "효율적인 문자열 압축 알고리즘. 'aabbbcccc'를 'a2b3c4'로 압축. 압축된 문자열이 원본보다 길면 원본 반환",
      language: "javascript",
      budget: 8192
    },
    {
      request: `
        비동기 작업 큐(Queue) 구현:
        - 최대 동시 실행 작업 수 제한
        - 작업 우선순위 지원
        - 작업 재시도 메커니즘
        - Promise 기반 API
      `,
      language: "javascript",
      budget: -1 // 동적 thinking
    },
    {
      request: "깊은 객체 비교 함수. 순환 참조 처리, 배열 순서 무시 옵션, 커스텀 비교 함수 지원",
      language: "javascript",
      budget: 12288
    },
    {
      request: `
        Rate Limiter 구현:
        - Token Bucket 알고리즘 사용
        - 초당 요청 수 제한
        - 버스트 트래픽 허용
        - 남은 토큰 수 확인 가능
      `,
      language: "javascript",
      budget: -1
    }
  ];

  // 사용자가 선택할 수 있도록 목록 표시
  console.log("구현 가능한 과제들:");
  codingTasks.forEach((task, i) => {
    console.log(`${i + 1}. ${task.request.substring(0, 60)}...`);
  });
  console.log("\n");

  // 각 과제 순차 실행
  for (let i = 0; i < codingTasks.length; i++) {
    console.log(`\n${"*".repeat(80)}`);
    console.log(`과제 ${i + 1}/${codingTasks.length}`);
    console.log("*".repeat(80) + "\n");
    
    await generateCode(
      codingTasks[i].request,
      codingTasks[i].language,
      codingTasks[i].budget
    );
    
    if (i < codingTasks.length - 1) {
      console.log("\n다음 과제 준비 중...\n");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // 보너스: 사용자 정의 요청
  console.log("\n" + "=".repeat(80));
  console.log("커스텀 코드 생성 예시");
  console.log("=".repeat(80) + "\n");
  
  const customRequest = `
    웹 스크래핑을 위한 재시도 로직이 포함된 HTTP 클라이언트 클래스.
    다음 기능 포함:
    - 지수 백오프를 사용한 재시도
    - 요청 타임아웃
    - 응답 캐싱
    - 에러 로깅
    - 프록시 지원
  `;
  
  await generateCode(customRequest, "javascript", -1);
}

// 실행
main().catch(console.error);