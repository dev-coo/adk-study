# Gemini Thinking Mode 예제 모음

이 폴더는 Google Gemini API의 Thinking 기능을 활용하는 다양한 예제를 포함합니다.

## 📋 준비 사항

### 1. API 키 발급
Google AI Studio에서 API 키를 발급받으세요:
https://aistudio.google.com/apikey

### 2. 환경 변수 설정
```bash
export GEMINI_API_KEY='your-api-key-here'
```

또는 각 파일에서 직접 API 키를 입력할 수 있습니다:
```javascript
const API_KEY = "your-api-key-here";
```

### 3. 의존성 설치
프로젝트 루트 디렉토리에서:
```bash
npm install @google/generative-ai
```

## 🚀 실행 방법

각 예제는 독립적으로 실행 가능합니다:

```bash
# 기본 thinking 예제
node thinking/basic-thinking.js

# 수학 문제 해결
node thinking/math-solver.js

# 코드 생성
node thinking/code-generator.js

# Thinking ON/OFF 비교
node thinking/thinking-comparison.js

# 동적 thinking 모드
node thinking/dynamic-thinking.js
```

## 📁 파일 설명

### 1. **thinking-overview.md**
- Thinking 기능의 전체 개요
- 파라미터 설명 및 사용 지침
- 모범 사례와 제한사항

### 2. **basic-thinking.js**
- Thinking 모드 기본 사용법
- 스트리밍 응답 처리
- 다양한 질문 유형 테스트

### 3. **math-solver.js**
- 수학 문제 해결 특화
- 다양한 난이도의 수학 문제
- thinking budget별 성능 비교

### 4. **code-generator.js**
- 프로그래밍 과제 해결
- 알고리즘 구현
- 코드 최적화

### 5. **thinking-comparison.js**
- Thinking ON vs OFF 비교
- 다양한 budget 설정 테스트
- 품질 및 성능 분석

### 6. **dynamic-thinking.js**
- 동적 thinking 모드 (-1 설정)
- 질문 복잡도에 따른 자동 조절
- 적응형 대화 예제

## 💡 Thinking Budget 가이드

| 값 | 설명 | 사용 시나리오 |
|---|---|---|
| 0 | Thinking 비활성화 | 간단한 질문, 빠른 응답 필요 |
| 1-2048 | 낮은 thinking | 기본적인 추론 |
| 2048-8192 | 중간 thinking | 일반적인 문제 해결 |
| 8192-16384 | 높은 thinking | 복잡한 분석, 수학 문제 |
| 16384-32768 | 매우 높은 thinking | 매우 복잡한 최적화 문제 |
| -1 | 동적 thinking | 모델이 자동으로 결정 |

## 🎯 사용 사례별 추천 설정

### 간단한 Q&A
```javascript
thinkingBudget: 0  // 또는 1024
```

### 코드 작성
```javascript
thinkingBudget: 8192  // 또는 -1 (동적)
```

### 수학/논리 문제
```javascript
thinkingBudget: 16384  // 또는 -1 (동적)
```

### 복잡한 최적화
```javascript
thinkingBudget: -1  // 동적 모드 추천
```

## ⚠️ 주의사항

1. **API 비용**: Thinking 토큰도 과금 대상입니다
2. **응답 시간**: 높은 thinking budget은 응답 시간이 길어집니다
3. **모델 제한**: `gemini-2.0-flash-thinking-exp-1219` 모델 필요
4. **실험적 기능**: 향후 변경될 수 있습니다

## 🔍 디버깅 팁

1. **토큰 사용량 확인**
```javascript
console.log(response.usageMetadata.totalTokenCount);
```

2. **스트리밍 상태 모니터링**
```javascript
for await (const chunk of result.stream) {
  // 청크별 처리
}
```

3. **에러 처리**
```javascript
try {
  const result = await chat.sendMessage(prompt);
} catch (error) {
  console.error("Error:", error.message);
}
```

## 📚 추가 리소스

- [Gemini API 공식 문서](https://ai.google.dev/gemini-api/docs)
- [Thinking Mode 가이드](https://ai.google.dev/gemini-api/docs/thinking)
- [API 키 관리](https://aistudio.google.com/apikey)

## 🤝 문의사항

문제가 발생하거나 질문이 있으시면 이슈를 생성해주세요!