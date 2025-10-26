# Gemini Thinking 기능 완벽 가이드

## Thinking Mode란?

Gemini 2.0 Flash 모델의 "thinking" 기능은 복잡한 문제를 해결하기 위해 내부적으로 추론 과정을 거치는 기능입니다. 모델이 답변하기 전에 "생각"하는 시간을 가지며, 이를 통해 더 정확하고 논리적인 답변을 제공합니다.

## 지원 모델

- `gemini-2.0-flash-thinking-exp-1219` - 실험적 thinking 모델
- `gemini-2.0-flash-thinking-exp` - 최신 실험 버전
- 일반 모델들도 thinking 설정 지원 가능

## 주요 파라미터

### thinkingBudget
- **용도**: thinking에 사용할 토큰 수 제어
- **값 범위**:
  - `0`: thinking 비활성화
  - `1-32768`: 고정 토큰 수 (모델에 따라 최대값 다름)
  - `-1`: 동적 thinking (모델이 자동 결정)

### 설정 예시
```javascript
generationConfig: {
  temperature: 1,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
  // Thinking 설정
  thinkingBudget: 8192  // 또는 -1 (동적)
}
```

## 언제 사용해야 하나?

### 적합한 경우
- 복잡한 수학 문제
- 다단계 논리 추론
- 알고리즘 설계
- 코드 디버깅
- 복잡한 분석 작업

### 부적합한 경우
- 간단한 질문
- 단순 정보 검색
- 번역 작업
- 기본적인 텍스트 생성

## Thinking 토큰과 비용

- Thinking 토큰은 출력 토큰에 포함되어 과금됨
- 복잡한 문제일수록 더 많은 thinking 토큰 사용
- 동적 모드(-1)는 필요에 따라 자동 조절

## 응답 구조

Thinking 모드 사용 시 응답은 두 부분으로 구성:
1. **Thinking 부분**: 내부 추론 과정 (선택적 표시)
2. **최종 답변**: 사용자에게 제공되는 결과

## 실제 사용 예시

### 1. 수학 문제
```javascript
// 복잡한 수학 문제에 높은 thinking budget
thinkingBudget: 16384
```

### 2. 코딩 문제
```javascript
// 알고리즘 설계에 동적 thinking
thinkingBudget: -1
```

### 3. 간단한 질문
```javascript
// thinking 비활성화
thinkingBudget: 0
```

## 모범 사례

1. **작업 복잡도에 따라 budget 조절**
   - 간단: 0-1024
   - 중간: 1024-8192
   - 복잡: 8192-32768
   - 매우 복잡: -1 (동적)

2. **스트리밍 사용 시 주의**
   - Thinking 토큰이 먼저 스트리밍됨
   - 실제 답변과 구분 필요

3. **디버깅 활용**
   - Thinking 과정을 분석하여 모델의 추론 이해
   - 잘못된 추론 발견 시 프롬프트 개선

## 제한사항

- 상태를 유지하지 않음 (stateless)
- 대화 컨텍스트 유지를 위해 thought signatures 필요
- 토큰 사용량 증가로 비용 상승
- 실험적 기능으로 변경 가능성 있음