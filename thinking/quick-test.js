import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function compareThinking() {
  // Thinking 모델 사용
  const thinkingModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp",
  });
  
  // 일반 모델 사용 (thinking 없음)
  const normalModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  // 논리 문제 예시
  const logicProblem = `
    세 개의 상자가 있습니다:
    - 상자 A: "금화가 여기 있다"
    - 상자 B: "금화는 A에 없다"  
    - 상자 C: "금화는 B에 없다"
    
    단 하나의 상자만 진실을 말합니다. 금화는 어느 상자에 있을까요?
    단계별로 논리적 추론을 보여주세요.
  `;

  console.log("=".repeat(60));
  console.log("🎯 문제:", logicProblem);
  console.log("=".repeat(60) + "\n");

  // 1. 일반 모델 (Thinking 없음)
  console.log("❌ 일반 모델 (gemini-1.5-flash)");
  console.log("-".repeat(40));
  
  try {
    const chat1 = normalModel.startChat();
    const result1 = await chat1.sendMessage(logicProblem);
    console.log(result1.response.text());
  } catch (error) {
    console.log("에러:", error.message);
  }
  console.log("\n");

  // 2. Thinking 모델
  console.log("✅ Thinking 모델 (gemini-2.0-flash-thinking-exp)");
  console.log("-".repeat(40));
  
  try {
    const chat2 = thinkingModel.startChat();
    const result2 = await chat2.sendMessage(logicProblem);
    console.log(result2.response.text());
  } catch (error) {
    console.log("에러:", error.message);
  }
}

async function mathComparison() {
  // Thinking 모델
  const thinkingModel = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp",
  });
  
  // 일반 모델
  const normalModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const mathProblem = `
    자동차가 시속 60km로 2시간 동안 달렸습니다.
    그 다음 30분 동안 시속 80km로 달렸습니다.
    그 다음 1시간 동안 시속 40km로 달렸습니다.
    
    1) 총 이동 거리는?
    2) 평균 속도는?
    3) 만약 전체 거리를 일정한 속도로 2시간에 가려면 시속 몇 km로 가야 할까요?
  `;

  console.log("\n" + "=".repeat(60));
  console.log("🔢 수학 문제 비교");
  console.log("=".repeat(60) + "\n");

  // 일반 모델
  try {
    const chat1 = normalModel.startChat();
    console.log("❌ 일반 모델 (gemini-1.5-flash):");
    const r1 = await chat1.sendMessage(mathProblem);
    console.log(r1.response.text() + "...\n");
  } catch (error) {
    console.log("에러:", error.message + "\n");
  }

  // Thinking 모델
  try {
    const chat2 = thinkingModel.startChat();
    console.log("✅ Thinking 모델 (gemini-2.0-flash-thinking-exp):");
    const r2 = await chat2.sendMessage(mathProblem);
    console.log(r2.response.text() + "...");
  } catch (error) {
    console.log("에러:", error.message);
  }
}

async function codeComparison() {
  const codeProblem = `
    다음 코드의 버그를 찾고 수정하세요:
    
    function removeDuplicates(arr) {
      let result = [];
      for (let i = 0; i <= arr.length; i++) {
        if (!result.includes(arr[i])) {
          result.push(arr[i]);
        }
      }
      return result;
    }
    
    // 테스트: removeDuplicates([1,2,2,3,3,4])
    // 예상: [1,2,3,4]
    // 실제: [1,2,3,4,undefined]
  `;

  console.log("\n" + "=".repeat(60));
  console.log("🐛 코드 디버깅 비교");
  console.log("=".repeat(60) + "\n");

  // 두 가지 모델로 테스트
  const models = [
    { name: "일반 모델 (gemini-1.5-flash)", model: "gemini-1.5-flash" },
    { name: "Thinking 모델 (gemini-2.0-flash-thinking-exp)", model: "gemini-2.0-flash-thinking-exp" }
  ];

  for (const config of models) {
    const model = genAI.getGenerativeModel({ model: config.model });
    const chat = model.startChat();
    
    console.log(`${config.name}:`);
    try {
      const result = await chat.sendMessage(codeProblem);
      const response = result.response.text();
      
      // 핵심 부분만 추출
      const bugFound = response.includes("<=") || response.includes("length - 1");
      const explained = response.includes("undefined") || response.includes("범위");
      
      console.log(`  버그 발곬: ${bugFound ? "✓" : "✗"}`);
      console.log(`  원인 설명: ${explained ? "✓" : "✗"}`);
      console.log(`  응답 길이: ${response.length}자\n`);
    } catch (error) {
      console.log(`  에러: ${error.message}\n`);
    }
  }
}

async function frontCodeComparison() {

  const frontCodeProblem = `
    react, vite 를 사용하여 아래에 설명에 어울리는 이상적인 프로젝트 구조를 만들어주세요.
    
    # 매장 식자재(기름) 주문 관리 시스템 요구사항 명세서

## 1. 시스템 개요
### 1.1 프로젝트 목적
치킨/돈까스 프랜차이즈 매장 점주들이 식자재(특히 기름류)를 효율적으로 주문하고 관리할 수 있는 모바일 웹뷰 애플리케이션 구축

### 1.2 대상 사용자
- 프랜차이즈 매장 점주 및 관리자
- 지원 프랜차이즈: 노랑통닭, 쌀통닭, 정상카츠

## 2. 기능 요구사항

### 2.1 인증 및 사용자 관리
#### 2.1.1 소셜 로그인
- Google, Kakao, Apple, Naver 소셜 로그인 지원
- 자동 로그인 기능 (로컬 스토리지 활용)
- 로그인 상태 영속성 유지

#### 2.1.2 회원가입
- 기본정보 입력: 이름, 전화번호, 이메일
- 매장 정보 등록 (최소 1개, 최대 5개)
  - 프랜차이즈 선택
  - 매장 주소
  - 매장 전화번호
- 매장 정보 동적 추가/삭제 기능
- 접이식 UI로 여러 매장 정보 관리

### 2.2 메인 대시보드
#### 2.2.1 공지사항
- 시스템 점검 등 중요 공지 표시
- 상단 고정 영역에 노출

#### 2.2.2 진행 중인 주문
- 현재 처리 중인 주문 요약 정보
- 예상 준비 시간 표시
- 주문 품목 및 수량 표시

#### 2.2.3 프로모션 배너
- 광고/이벤트 배너 이미지 표시

### 2.3 네비게이션
#### 2.3.1 상단 헤더
- 현재 선택된 매장 정보 표시
- 매장 전환 드롭다운 메뉴

#### 2.3.2 하단 탭 네비게이션
- 홈: 메인 대시보드
- 주문: 새로운 주문 생성
- 주문내역: 과거 주문 조회
- 내정보: 사용자 및 매장 정보 관리

### 2.4 주문 페이지
#### 2.4.1 진행 중인 주문이 있는 경우
- 주문 상태 표시
  - 주문대기
  - 접수
  - 배송중
- 각 상태별 진행 표시 (프로그레스 바 또는 스텝 인디케이터)
- 예상 도착 시간 표시

#### 2.4.2 진행 중인 주문이 없는 경우
- 과거 주문 내역 리스트 표시
- 주문 날짜, 품목, 금액 정보
- 재주문 기능

### 2.5 보안 및 접근 제어
- 인증되지 않은 사용자 자동 로그인 페이지 리다이렉트
- withAuth HOC를 통한 페이지 보호

  `

  console.log("\n" + "=".repeat(60));
  console.log("🐛 프론트 코딩 비교");
  console.log("=".repeat(60) + "\n");

  // 두 가지 모델로 테스트
  const models = [
    { name: "일반 모델 (gemini-1.5-flash)", model: "gemini-1.5-flash" },
    { name: "Thinking 모델 (gemini-2.0-flash-thinking-exp)", model: "gemini-2.0-flash-thinking-exp" }
  ];
  for (const config of models) {
    const model = genAI.getGenerativeModel({ model: config.model });
    const chat = model.startChat();
    
    console.log(`${config.name}:`);
    try {
      const result = await chat.sendMessage(frontCodeProblem);
      const response = result.response.text();
      console.log(response);
    } catch (error) {
      console.log(`  에러: ${error.message}\n`);
    }
  }
}

async function main() {
  if (API_KEY === "YOUR_API_KEY_HERE") {
    console.error("❌ API 키를 설정해주세요!");
    process.exit(1);
  }

  console.log("Thinking 기능 실전 비교 테스트");
  console.log("==============================\n");

  // 1. 논리 문제
  // await compareThinking();
  
  // // 2. 수학 문제
  // await mathComparison();
  
  // // 3. 코드 디버깅
  // await codeComparison();

  // 4. 프론트 코딩
  await frontCodeComparison();


  console.log("\n" + "=".repeat(60));
  console.log("📌 주요 차이점 요약");
  console.log("=".repeat(60));
}

main().catch(console.error);