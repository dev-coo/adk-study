# Imagen API Examples

Google Imagen API를 활용한 다양한 이미지 생성 예제 모음입니다.

## 📁 프로젝트 구조

```
imagen/
├── 01-basic/               # 기본 이미지 생성
│   └── basic-generation.js
├── 02-parameters/          # 파라미터 활용
│   ├── multiple-images.js  # 여러 이미지 생성
│   ├── aspect-ratios.js    # 다양한 화면 비율
│   └── image-sizes.js      # 이미지 크기 설정
├── 03-prompt-engineering/  # 프롬프트 작성 기법
│   ├── descriptive-prompts.js  # 상세한 프롬프트
│   └── style-modifiers.js      # 스타일 수정자
├── 04-styles/              # 스타일별 예제
│   ├── photographic.js     # 사진 스타일
│   ├── artistic.js         # 예술 스타일
│   └── abstract.js         # 추상 스타일
├── 05-advanced/            # 고급 활용
│   ├── batch-generation.js     # 배치 생성
│   └── prompt-variations.js    # 프롬프트 변형
├── utils/                  # 유틸리티
│   └── imagen-helper.js
├── config.js               # 설정 파일
└── output/                 # 생성된 이미지 저장
```

## 🚀 시작하기

### 설치
```bash
npm install
```

### 실행 방법

각 예제를 개별적으로 실행할 수 있습니다:

```bash
# 기본 이미지 생성
node imagen/01-basic/basic-generation.js

# 여러 이미지 생성
node imagen/02-parameters/multiple-images.js

# 화면 비율 예제
node imagen/02-parameters/aspect-ratios.js

# 이미지 크기 예제
node imagen/02-parameters/image-sizes.js

# 상세 프롬프트 예제
node imagen/03-prompt-engineering/descriptive-prompts.js

# 스타일 수정자 예제
node imagen/03-prompt-engineering/style-modifiers.js

# 사진 스타일
node imagen/04-styles/photographic.js

# 예술 스타일
node imagen/04-styles/artistic.js

# 추상 스타일
node imagen/04-styles/abstract.js

# 배치 생성
node imagen/05-advanced/batch-generation.js

# 프롬프트 변형
node imagen/05-advanced/prompt-variations.js
```

## 📚 예제 설명

### 01. 기본 예제 (Basic)
- **basic-generation.js**: 간단한 텍스트 프롬프트로 이미지 생성

### 02. 파라미터 활용 (Parameters)
- **multiple-images.js**: 1개, 2개, 4개 이미지 동시 생성
- **aspect-ratios.js**: 1:1, 3:4, 4:3, 9:16, 16:9 비율 테스트
- **image-sizes.js**: 1K, 2K 해상도 비교

### 03. 프롬프트 엔지니어링 (Prompt Engineering)
- **descriptive-prompts.js**: 기본 → 상세한 프롬프트 비교
- **style-modifiers.js**: 품질, 디테일, 시네마틱 수정자 활용

### 04. 스타일별 예제 (Styles)
- **photographic.js**: 인물, 풍경, 스트릿, 매크로, 야생동물 사진
- **artistic.js**: 유화, 수채화, 디지털 아트, 스케치, 팝아트
- **abstract.js**: 기하학, 유체, 표현주의, 프랙탈, 미니멀

### 05. 고급 활용 (Advanced)
- **batch-generation.js**: 여러 프롬프트 일괄 처리
- **prompt-variations.js**: 하나의 주제로 다양한 변형 생성

## ⚙️ 주요 설정 (config.js)

```javascript
{
  model: "imagen-4.0-generate-001",
  defaultParams: {
    numberOfImages: 1,
    aspectRatio: "1:1",
    personGeneration: "allow"
  }
}
```

## 🎨 프롬프트 작성 팁

### 효과적인 프롬프트 구성 요소
1. **주제(Subject)**: 명확한 주 대상
2. **설정(Setting)**: 환경과 배경
3. **스타일(Style)**: 예술적 스타일이나 매체
4. **조명(Lighting)**: 빛의 방향과 품질
5. **색상(Color)**: 색상 팔레트나 분위기
6. **구도(Composition)**: 카메라 각도나 프레이밍

### 예시
```
기본: "A cat"
개선: "A fluffy orange tabby cat with green eyes, sitting on a windowsill, golden hour lighting, photorealistic style"
```

## 📝 유용한 수정자

### 품질 관련
- `ultra high quality, masterpiece, best quality`
- `extremely detailed, intricate details`
- `8K resolution, photorealistic`

### 스타일 관련
- `oil painting, watercolor, pencil sketch`
- `digital art, concept art, illustration`
- `vintage, retro, modern, futuristic`

### 카메라/렌즈
- `wide angle, telephoto, macro lens`
- `35mm, 50mm, 85mm lens`
- `shallow depth of field, bokeh`

### 조명
- `golden hour, blue hour, sunset`
- `studio lighting, natural light`
- `dramatic lighting, soft lighting`

## 🔧 유틸리티 함수 (imagen-helper.js)

### 주요 함수
- `generateImages()`: 이미지 생성
- `saveImage()`: 이미지 저장
- `enhancePrompt()`: 프롬프트 개선
- `batchGenerateImages()`: 배치 생성
- `createTimestampFilename()`: 타임스탬프 파일명 생성

### 사전 정의된 스타일
- `STYLE_PRESETS`: 사진, 예술, 추상 등 스타일 프리셋
- `QUALITY_MODIFIERS`: 품질 관련 수정자
- `SUPPORTED_ASPECT_RATIOS`: 지원되는 화면 비율

## ⚠️ 제한사항

- 영어 프롬프트만 지원
- 요청당 최대 4개 이미지
- 최대 480 토큰 프롬프트 길이
- 모든 이미지에 SynthID 워터마크 포함

## 💾 출력

생성된 이미지는 `imagen/output/` 폴더에 자동 저장됩니다.
파일명 형식: `[prefix]_YYYY-MM-DDTHH-MM-SS-MS.png`

## 🔑 API 키

현재 프로젝트의 API 키를 사용합니다 (config.js에 정의).
보안을 위해 프로덕션 환경에서는 환경 변수 사용을 권장합니다.

## 📚 참고 문서

- [Google AI Imagen API 문서](https://ai.google.dev/gemini-api/docs/imagen)
- [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)