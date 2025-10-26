import { GoogleGenerativeAI } from "@google/generative-ai";

// API 키 설정
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";

const genAI = new GoogleGenerativeAI(API_KEY);

async function solveMathProblem(problem, thinkingBudget = 16384) {
  // 높은 thinking budget으로 모델 설정
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-1219",
    generationConfig: {
      temperature: 0.7, // 수학 문제는 낮은 temperature
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    },
  });

  const chat = model.startChat({
    generationConfig: {
      thinkingBudget: thinkingBudget, // 높은 thinking budget
    },
  });

  console.log(`문제: ${problem}`);
  console.log(`Thinking Budget: ${thinkingBudget} tokens`);
  console.log("\n복잡한 계산 중... 🤔\n");

  const startTime = Date.now();
  
  try {
    const result = await chat.sendMessageStream(problem);
    
    console.log("해결 과정:\n");
    let fullResponse = "";
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
      fullResponse += chunkText;
    }
    
    const endTime = Date.now();
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log("\n\n" + "=".repeat(80));
    console.log(`처리 시간: ${elapsedTime}초`);
    
    // 토큰 사용량 확인
    const response = await result.response;
    if (response.usageMetadata) {
      console.log(`Thinking 토큰 포함 총 사용량: ${response.usageMetadata.totalTokenCount}`);
    }
    
    return fullResponse;
  } catch (error) {
    console.error("오류 발생:", error.message);
    return null;
  }
}

async function main() {
  console.log("Gemini Thinking Mode - Math Solver");
  console.log("===================================\n");
  
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    console.log("환경 변수 설정: export GEMINI_API_KEY='your-api-key'");
    process.exit(1);
  }

  // 다양한 난이도의 수학 문제들
  const mathProblems = [
    {
      problem: "다음 방정식을 풀어주세요: 3x² - 12x + 9 = 0",
      budget: 2048
    },
    {
      problem: `
        한 농부가 100미터 길이의 울타리를 가지고 있습니다.
        이 울타리로 직사각형 모양의 닭장을 만들려고 합니다.
        닭장의 넓이를 최대로 하려면 가로와 세로를 각각 얼마로 해야 할까요?
        계산 과정을 자세히 보여주세요.
      `,
      budget: 8192
    },
    {
      problem: `
        다음 수열의 패턴을 찾고 다음 3개 항을 구하세요:
        2, 6, 12, 20, 30, 42, ...
        
        또한 n번째 항을 구하는 일반 공식을 유도해주세요.
      `,
      budget: 12288
    },
    {
      problem: `
        어떤 은행이 연 이율 5%의 복리로 예금을 받습니다.
        10,000달러를 예금했을 때:
        1) 10년 후 잔액은 얼마일까요?
        2) 잔액이 2배가 되는데 걸리는 시간은?
        3) 매월 100달러씩 추가로 입금한다면 10년 후 잔액은?
        
        각 질문에 대해 공식과 계산 과정을 보여주세요.
      `,
      budget: 16384
    },
    {
      problem: `
        다음 적분을 계산하세요:
        ∫(x³ + 2x² - 5x + 3)dx from x=0 to x=3
        
        단계별로 풀이 과정을 보여주세요.
      `,
      budget: 8192
    }
  ];

  // 문제 선택 (인터랙티브하게 만들 수도 있음)
  console.log("사용 가능한 문제들:");
  mathProblems.forEach((p, i) => {
    console.log(`${i + 1}. ${p.problem.substring(0, 50)}...`);
  });
  console.log("\n");

  // 모든 문제 순차적으로 해결
  for (let i = 0; i < mathProblems.length; i++) {
    console.log(`\n${"=".repeat(80)}`);
    console.log(`문제 ${i + 1}/${mathProblems.length}`);
    console.log("=".repeat(80) + "\n");
    
    await solveMathProblem(
      mathProblems[i].problem, 
      mathProblems[i].budget
    );
    
    console.log("\n");
    
    // 다음 문제 전 잠시 대기 (API 제한 고려)
    if (i < mathProblems.length - 1) {
      console.log("다음 문제로 진행 중...\n");
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // 동적 thinking 모드 테스트
  console.log("\n" + "=".repeat(80));
  console.log("동적 Thinking 모드 테스트 (budget = -1)");
  console.log("=".repeat(80) + "\n");
  
  await solveMathProblem(
    `
    피보나치 수열의 n번째 항을 구하는 가장 효율적인 알고리즘을 설계하고,
    시간 복잡도와 공간 복잡도를 분석해주세요.
    또한 n=50일 때의 값을 계산해주세요.
    `,
    -1 // 동적 thinking
  );
}

// 실행
main().catch(console.error);