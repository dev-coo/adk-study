import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

// 색상 코드 (터미널 출력용)
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

async function testWithThinking(question, thinkingBudget) {
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

  const chat = model.startChat({
    generationConfig: {
      thinkingBudget: thinkingBudget,
    },
  });

  const startTime = Date.now();
  const result = await chat.sendMessage(question);
  const endTime = Date.now();
  
  return {
    response: result.response.text(),
    time: ((endTime - startTime) / 1000).toFixed(2),
    tokens: result.response.usageMetadata?.totalTokenCount || 0,
  };
}

async function compareThinkingModes() {
  // 테스트할 질문들
  const testQuestions = [
    {
      title: "논리 추론 문제",
      question: `
        세 명의 친구 A, B, C가 있습니다.
        - A는 B보다 키가 큽니다.
        - C는 A보다 키가 작습니다.
        - B와 C 중 한 명은 180cm입니다.
        - 가장 키가 큰 사람은 185cm입니다.
        
        각 사람의 가능한 키 범위를 추론해주세요.
      `
    },
    {
      title: "알고리즘 설계",
      question: `
        주어진 배열에서 연속된 부분 배열의 합이 특정 값 K가 되는 
        모든 경우의 수를 찾는 효율적인 알고리즘을 설계하세요.
        시간 복잡도를 최적화하는 방법을 설명해주세요.
      `
    },
    {
      title: "창의적 문제 해결",
      question: `
        당신은 100층 빌딩에서 계란 2개를 가지고 있습니다.
        계란이 깨지지 않는 최고 층수를 찾아야 합니다.
        최악의 경우에도 가장 적은 시도로 답을 찾는 전략은 무엇일까요?
      `
    },
    {
      title: "코드 디버깅",
      question: `
        다음 JavaScript 코드에 버그가 있습니다. 무엇이 문제이고 어떻게 고칠까요?
        
        \`\`\`javascript
        function findDuplicates(arr) {
          let duplicates = [];
          for (let i = 0; i <= arr.length; i++) {
            for (let j = i + 1; j <= arr.length; j++) {
              if (arr[i] === arr[j]) {
                duplicates.push(arr[i]);
              }
            }
          }
          return duplicates;
        }
        \`\`\`
      `
    }
  ];

  console.log("Gemini Thinking Mode - ON vs OFF Comparison");
  console.log("============================================\n");

  for (const test of testQuestions) {
    console.log(`${colors.cyan}📋 ${test.title}${colors.reset}`);
    console.log(`질문: ${test.question.substring(0, 100)}...`);
    console.log("\n" + "-".repeat(80) + "\n");

    // Thinking OFF (budget = 0)
    console.log(`${colors.red}❌ Thinking OFF (budget = 0)${colors.reset}`);
    try {
      const withoutThinking = await testWithThinking(test.question, 0);
      console.log(`응답 시간: ${withoutThinking.time}초`);
      console.log(`토큰 사용: ${withoutThinking.tokens}`);
      console.log("\n답변:");
      console.log(withoutThinking.response.substring(0, 300) + "...\n");
    } catch (error) {
      console.log(`오류: ${error.message}\n`);
    }

    // Thinking ON - Medium (budget = 8192)
    console.log(`${colors.yellow}⚡ Thinking ON - Medium (budget = 8192)${colors.reset}`);
    try {
      const withMediumThinking = await testWithThinking(test.question, 8192);
      console.log(`응답 시간: ${withMediumThinking.time}초`);
      console.log(`토큰 사용: ${withMediumThinking.tokens}`);
      console.log("\n답변:");
      console.log(withMediumThinking.response.substring(0, 300) + "...\n");
    } catch (error) {
      console.log(`오류: ${error.message}\n`);
    }

    // Thinking ON - Dynamic (budget = -1)
    console.log(`${colors.green}✅ Thinking ON - Dynamic (budget = -1)${colors.reset}`);
    try {
      const withDynamicThinking = await testWithThinking(test.question, -1);
      console.log(`응답 시간: ${withDynamicThinking.time}초`);
      console.log(`토큰 사용: ${withDynamicThinking.tokens}`);
      console.log("\n답변:");
      console.log(withDynamicThinking.response.substring(0, 300) + "...\n");
    } catch (error) {
      console.log(`오류: ${error.message}\n`);
    }

    console.log("=".repeat(80) + "\n");
    
    // API 제한 방지를 위한 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

async function detailedComparison() {
  console.log("\n" + "=".repeat(80));
  console.log(`${colors.magenta}상세 비교 분석${colors.reset}`);
  console.log("=".repeat(80) + "\n");

  const complexProblem = `
    다음 최적화 문제를 해결하세요:
    
    한 회사가 3개의 공장과 4개의 창고를 운영합니다.
    각 공장의 생산 능력: [100, 150, 200]
    각 창고의 수요: [80, 120, 100, 150]
    
    공장 i에서 창고 j로의 운송 비용 (단위당):
    [[4, 6, 8, 10],
     [5, 5, 7, 8],
     [6, 4, 3, 5]]
    
    총 운송 비용을 최소화하는 배송 계획을 수립하세요.
    선형 프로그래밍 문제로 정식화하고 해결 방법을 제시하세요.
  `;

  console.log("복잡한 최적화 문제 테스트\n");

  const configs = [
    { name: "No Thinking", budget: 0, color: colors.red },
    { name: "Low Thinking (2048)", budget: 2048, color: colors.yellow },
    { name: "Medium Thinking (8192)", budget: 8192, color: colors.blue },
    { name: "High Thinking (16384)", budget: 16384, color: colors.cyan },
    { name: "Dynamic Thinking (-1)", budget: -1, color: colors.green },
  ];

  const results = [];

  for (const config of configs) {
    console.log(`${config.color}테스트: ${config.name}${colors.reset}`);
    
    try {
      const result = await testWithThinking(complexProblem, config.budget);
      results.push({
        ...config,
        ...result,
        quality: assessQuality(result.response),
      });
      
      console.log(`✓ 완료 (${result.time}초, ${result.tokens} 토큰)\n`);
    } catch (error) {
      console.log(`✗ 실패: ${error.message}\n`);
      results.push({
        ...config,
        error: error.message,
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 결과 요약
  console.log("\n" + "=".repeat(80));
  console.log("📊 비교 결과 요약");
  console.log("=".repeat(80) + "\n");

  console.log("| 설정 | 시간(초) | 토큰 | 품질 평가 |");
  console.log("|------|----------|------|-----------|");
  
  for (const result of results) {
    if (result.error) {
      console.log(`| ${result.name} | ERROR | - | - |`);
    } else {
      console.log(
        `| ${result.name} | ${result.time} | ${result.tokens} | ${result.quality} |`
      );
    }
  }
}

function assessQuality(response) {
  // 간단한 품질 평가 (실제로는 더 정교한 평가 필요)
  const criteria = {
    hasFormulation: response.includes("선형") || response.includes("linear"),
    hasVariables: response.includes("x") || response.includes("변수"),
    hasObjective: response.includes("최소") || response.includes("minimize"),
    hasConstraints: response.includes("제약") || response.includes("constraint"),
    hasSolution: response.includes("해") || response.includes("solution"),
  };
  
  const score = Object.values(criteria).filter(v => v).length;
  
  if (score >= 4) return "⭐⭐⭐⭐⭐";
  if (score >= 3) return "⭐⭐⭐⭐";
  if (score >= 2) return "⭐⭐⭐";
  if (score >= 1) return "⭐⭐";
  return "⭐";
}

async function main() {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    console.log("환경 변수 설정: export GEMINI_API_KEY='your-api-key'");
    process.exit(1);
  }

  // 기본 비교
  await compareThinkingModes();
  
  // 상세 비교
  await detailedComparison();
  
  console.log("\n✅ 모든 테스트 완료!");
}

// 실행
main().catch(console.error);