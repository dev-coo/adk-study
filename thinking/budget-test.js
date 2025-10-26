import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function testBudgetLimits() {
  console.log("Thinking Budget 한계 테스트");
  console.log("=".repeat(60) + "\n");

  // 매우 복잡한 문제 (많은 thinking 필요)
  const complexProblem = `
    다음 논리 퍼즐을 풀어주세요:
    
    5명의 사람(A, B, C, D, E)이 있고, 각자 다른 색깔의 집(빨강, 파랑, 초록, 노랑, 하양)에 살며,
    각자 다른 애완동물(개, 고양이, 새, 물고기, 햄스터)을 키우고,
    각자 다른 음료(커피, 차, 우유, 주스, 물)를 마십니다.
    
    조건:
    1. A는 빨간 집에 산다
    2. B는 개를 키운다
    3. C는 차를 마신다
    4. 초록 집 주인은 커피를 마신다
    5. D는 새를 키운다
    6. 노란 집 주인은 햄스터를 키운다
    7. 우유를 마시는 사람은 E 옆집에 산다
    8. 새를 키우는 사람은 주스를 마신다
    9. 파란 집은 하얀 집 바로 왼쪽에 있다
    10. 물고기를 키우는 사람은 물을 마신다
    
    각 사람이 어떤 집에 살고, 무슨 동물을 키우며, 무슨 음료를 마시는지 
    완전한 표를 만들어주세요. 모든 추론 과정을 단계별로 보여주세요.
  `;

  // 다양한 budget으로 테스트
  const budgets = [
    { value: 0, name: "Budget 0 (thinking 완전 비활성화)" },
    { value: 100, name: "Budget 100 (매우 적은 thinking)" },
    { value: 1000, name: "Budget 1000 (적은 thinking)" },
    { value: 5000, name: "Budget 5000 (중간 thinking)" },
    { value: 16384, name: "Budget 16384 (높은 thinking)" },
    { value: -1, name: "Budget -1 (동적 thinking)" }
  ];

  for (const budget of budgets) {
    console.log("\n" + "=".repeat(60));
    console.log(`🧠 ${budget.name}`);
    console.log("-" * 60);

    try {
      // Thinking 모델 사용
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-thinking-exp",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8192,
        }
      });

      const startTime = Date.now();
      
      // Budget 설정을 위한 시스템 프롬프트 추가
      const prompt = budget.value === 0 
        ? `답변을 매우 간단하게 해주세요. ${complexProblem}`
        : budget.value === -1
        ? `충분히 생각한 후 답변해주세요. ${complexProblem}`
        : `약 ${budget.value} 토큰 정도의 추론을 사용해서 답변해주세요. ${complexProblem}`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();
      
      const endTime = Date.now();
      const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);

      // 응답 품질 분석
      const hasTable = response.includes("표") || response.includes("|") || response.includes("Table");
      const hasSteps = response.includes("단계") || response.includes("Step") || response.includes("추론");
      const isSolved = response.includes("A") && response.includes("B") && response.includes("C");
      const responseLength = response.length;

      console.log(`⏱️ 처리 시간: ${elapsedTime}초`);
      console.log(`📝 응답 길이: ${responseLength}자`);
      console.log(`✅ 표 포함: ${hasTable ? "Yes" : "No"}`);
      console.log(`✅ 단계별 설명: ${hasSteps ? "Yes" : "No"}`);
      console.log(`✅ 문제 해결: ${isSolved ? "Likely" : "Uncertain"}`);
      
      // 응답 미리보기
      console.log("\n📄 응답 미리보기:");
      console.log(response.substring(0, 300) + "...");

      // 토큰 사용량 확인
      if (result.response.usageMetadata) {
        console.log(`\n📊 토큰 사용량:`);
        console.log(`  - 입력: ${result.response.usageMetadata.promptTokenCount}`);
        console.log(`  - 출력: ${result.response.usageMetadata.candidatesTokenCount}`);
        console.log(`  - 총합: ${result.response.usageMetadata.totalTokenCount}`);
      }

    } catch (error) {
      console.log(`❌ 오류 발생: ${error.message}`);
      
      // 특별한 오류 메시지 확인
      if (error.message.includes("budget") || error.message.includes("token")) {
        console.log("💡 Budget 관련 오류 - thinking이 중단되었을 수 있습니다");
      }
    }

    // API 제한 방지
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

async function testBudgetExhaustion() {
  console.log("\n\n" + "=" * 60);
  console.log("🔴 Budget 소진 시나리오 테스트");
  console.log("=".repeat(60) + "\n");

  // 아주 작은 budget으로 복잡한 문제 해결 시도
  const tinyBudgets = [10, 50, 100];
  
  const veryComplexProblem = `
    피보나치 수열의 1000번째 항을 계산하는 가장 효율적인 알고리즘을 설계하고,
    그 알고리즘의 시간복잡도와 공간복잡도를 분석한 후,
    실제로 1000번째 값을 계산해주세요.
    또한 동적 프로그래밍, 행렬 곱셈, 황금비 공식 세 가지 방법을 모두 비교해주세요.
  `;

  for (const budget of tinyBudgets) {
    console.log(`\n🧪 매우 작은 Budget: ${budget} 토큰`);
    console.log("-" * 40);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-thinking-exp",
      });

      const prompt = `최대 ${budget} 토큰의 thinking으로 답변해주세요. ${veryComplexProblem}`;
      
      const startTime = Date.now();
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      const endTime = Date.now();

      console.log(`⏱️ 시간: ${((endTime - startTime) / 1000).toFixed(2)}초`);
      console.log(`📝 응답 길이: ${response.length}자`);
      
      // Budget이 소진되면 어떤 일이 일어나는지 확인
      const isIncomplete = response.includes("...") || response.length < 500;
      const hasWarning = response.includes("제한") || response.includes("limit");
      
      console.log(`⚠️ 불완전한 답변: ${isIncomplete ? "Yes" : "No"}`);
      console.log(`⚠️ 경고 메시지: ${hasWarning ? "Yes" : "No"}`);
      
      console.log("\n응답:");
      console.log(response.substring(0, 200) + "...");

    } catch (error) {
      console.log(`❌ 오류: ${error.message}`);
      
      // Budget 소진 시 특별한 에러 메시지가 있는지 확인
      if (error.message.toLowerCase().includes("budget") || 
          error.message.toLowerCase().includes("exceeded") ||
          error.message.toLowerCase().includes("limit")) {
        console.log("💥 Budget 소진으로 인한 오류로 추정됩니다!");
      }
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

async function main() {
  console.log("🔬 Thinking Budget 한계 실험");
  console.log("==============================\n");

  // 1. 다양한 budget 한계 테스트
  await testBudgetLimits();

  // 2. Budget 소진 시나리오
  await testBudgetExhaustion();

  console.log("\n\n" + "=" * 60);
  console.log("📋 실험 결론");
  console.log("=" * 60);
  console.log(`
1. Budget = 0: Thinking 완전 비활성화, 직관적 답변만
2. Budget 낮음 (100-1000): 제한된 추론, 간단한 답변
3. Budget 중간 (5000-10000): 적절한 추론과 설명
4. Budget 높음 (10000+): 깊은 분석과 상세한 단계
5. Budget = -1: 모델이 자동으로 필요한 만큼 사용

⚠️ Budget 소진 시:
- 추론이 중간에 중단됨
- 불완전하거나 부정확한 답변 가능
- 에러는 발생하지 않고 그냥 중단된 상태로 답변 제공
- "생각"이 끝나지 않은 채로 답변을 시작할 수 있음
  `);
}

main().catch(console.error);