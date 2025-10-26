Thinking 기능 실전 비교 테스트
==============================


============================================================
🐛 프론트 코딩 비교
============================================================

일반 모델 (gemini-1.5-flash):
이 프로젝트 구조는 React의 컴포넌트 기반 아키텍처와 Vite의 빌드 속도를 활용하여 유지보수 가능하고 효율적인 모바일 웹 애플리케이션을 구현합니다.

```
oil-ordering-system/
├── public/
│   └── index.html
├── src/
│   ├── assets/  // 이미지, 로고 등
│   │   ├── logos/
│   │   └── banners/
│   ├── components/
│   │   ├── Auth/            // 인증 컴포넌트
│   │   │   ├── GoogleLogin.jsx
│   │   │   ├── KakaoLogin.jsx
│   │   │   ├── AppleLogin.jsx
│   │   │   ├── NaverLogin.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── AuthLayout.jsx
│   │   ├── Common/          // 재사용 가능한 컴포넌트
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── Dashboard/       // 대시보드 컴포넌트
│   │   │   ├── Announcements.jsx
│   │   │   ├── OrderSummary.jsx
│   │   │   └── PromotionBanner.jsx
│   │   ├── Navigation/      // 내비게이션 컴포넌트
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── Order/           // 주문 컴포넌트
│   │   │   ├── OrderForm.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   └── OrderDetails.jsx
│   │   ├── Profile/         // 프로필 컴포넌트
│   │   │   ├── ProfileInfo.jsx
│   │   │   └── StoreManagement.jsx
│   │   └── UI/             // 커스텀 UI 요소 (필요시)
│   │       └── Accordion.jsx
│   ├── contexts/          // 상태 관리를 위한 Context API (예: 사용자 인증, 선택된 매장)
│   │   ├── AuthContext.jsx
│   │   └── StoreContext.jsx
│   ├── hooks/             // 커스텀 React 훅
│   │   ├── useAuth.js
│   │   └── useStore.js
│   ├── pages/             // 페이지 레벨 컴포넌트
│   │   ├── Home.jsx
│   │   ├── Order.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── Profile.jsx
│   │   └── Login.jsx
│   ├── services/          // API 호출 및 데이터 페칭
│   │   ├── authService.js
│   │   └── orderService.js
│   ├── routes/            // 라우팅 설정
│   │   └── AppRouter.jsx
│   ├── App.jsx             // 메인 애플리케이션 컴포넌트
│   ├── index.css          // 전역 스타일
│   └── main.jsx           // 진입점
├── vite.config.js
└── package.json

```

**폴더 및 파일 설명:**

* **`public`:** `index.html` 파일과 같은 정적 자산들.
* **`src`:** 소스 코드를 포함합니다.
  * **`assets`:** 이미지, 로고 및 기타 정적 자산을 저장합니다. 하위 폴더로 이러한 자산들을 논리적으로 구성합니다.
  * **`components`:** 기능이나 기능별로 구성된 재사용 가능한 UI 컴포넌트. 하위 폴더 사용으로 구성을 크게 개선합니다.
  * **`contexts`:** React Context API를 사용하여 전역 상태를 관리합니다. 사용자 인증 및 현재 선택된 매장 관리에 중요합니다.
  * **`hooks`:** 재사용 가능한 로직을 위한 커스텀 React 훅 (예: 데이터 페칭, 폼 상태 관리).
  * **`pages`:** 애플리케이션의 다른 뷰나 페이지를 나타내는 최상위 컴포넌트.
  * **`services`:** 백엔드 서비스에 API 호출을 하는 함수들을 포함합니다.
  * **`routes`:** React Router와 같은 라우터 라이브러리를 사용한 라우팅을 처리합니다. 라우트 정의를 중앙화합니다.
  * **`App.jsx`:** 메인 애플리케이션 컴포넌트.
  * **`index.css`:** 전역 스타일시트.
  * **`main.jsx`:** 애플리케이션 진입점.


**주요 개선사항:**

* **명확한 컴포넌트 구조:** 컴포넌트들이 논리적으로 그룹화되어 유지보수성과 재사용성을 향상시킵니다.
* **상태 관리를 위한 Context API:** 컴포넌트 간 상태 공유를 단순화하며, 특히 인증 및 활성 매장 선택에 유용합니다.
* **전용 서비스 레이어:** 데이터 페칭 로직을 UI 컴포넌트에서 분리합니다.
* **라우팅:** 전용 `routes` 폴더가 라우팅 설정을 중앙화합니다.
* **자산 구성:** 자산들이 논리적인 하위 폴더로 구성됩니다.
* **훅:** 공통 로직의 재사용성.


**다음 단계:**

1. **상태 관리 라이브러리 선택 (필요시):** Context API는 작은 앱에서 잘 작동하지만, 더 크고 복잡한 애플리케이션의 경우 Redux Toolkit이나 Zustand를 고려하세요.
2. **API 호출 구현:** 백엔드 API를 생성하거나 기존 API에 연결합니다. `services` 폴더가 이 로직이 위치하는 곳입니다.
3. **인증 구현:** 적절한 인증 라이브러리나 서비스를 사용하여 `Auth` 컴포넌트 및 `AuthContext`와 통합합니다.
4. **라우팅 구현:** React Router나 유사한 라이브러리를 사용하여 페이지를 라우트에 연결합니다.


이 개선된 구조는 Vite를 사용하는 확장 가능하고 유지보수 가능한 React 애플리케이션의 견고한 기반을 마련합니다. npm이나 yarn을 사용하여 필요한 의존성(React, React Router, 스타일링 라이브러리 등)을 설치하는 것을 잊지 마세요.

Thinking 모델 (gemini-2.0-flash-thinking-exp):
네, React와 Vite를 사용하여 매장 식자재 주문 관리 시스템 요구사항에 어울리는 이상적인 프로젝트 구조를 제안해 드립니다.

이 구조는 **기능 중심(Feature-driven)** 설계 원칙을 따르며, 재사용성, 확장성, 유지보수성을 극대화하는 데 중점을 둡니다.

---








## 프로젝트 구조 개요

```
my-restaurant-order-app/
├── public/
│   └── favicon.ico
│   └── index.html
│   └── ... (정적 자산)
├── src/
│   ├── api/                      # API 통신 정의 (RTK Query 활용)
│   │   ├── authApi.js
│   │   ├── ordersApi.js
│   │   ├── storeApi.js
│   │   └── baseApi.js            # 모든 API의 기본 엔드포인트
│   ├── assets/                   # 이미지, 아이콘, 폰트 등 정적 자산
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   ├── components/               # 재사용 가능한 범용 UI 컴포넌트
│   │   ├── common/               # 버튼, 입력 필드, 모달, 로더 등 기본 UI 요소
│   │   │   ├── Button.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Spinner.jsx
│   │   ├── layout/               # 앱 전체 레이아웃 관련 컴포넌트
│   │   │   ├── MainLayout.jsx    # 헤더 + 내용 + 하단 탭
│   │   │   ├── AuthLayout.jsx    # 로그인/회원가입 전용 레이아웃
│   │   │   └── ScrollToTop.jsx
│   │   ├── navigation/           # 내비게이션 관련 컴포넌트
│   │   │   ├── TopHeader.jsx     # 현재 매장 정보, 매장 전환 드롭다운
│   │   │   └── BottomTabNavigator.jsx # 하단 탭 바
│   │   └── ui/                   # 특정 로직 없이 순수하게 UI만 담당하는 컴포넌트
│   │       ├── Card.jsx
│   │       ├── Dropdown.jsx
│   │       └── ProgressBar.jsx
│   ├── constants/                # 상수, 설정 값 모음
│   │   ├── api.js                # API 엔드포인트, 타임아웃
│   │   ├── app.js                # 앱 관련 설정 (프랜차이즈 리스트 등)
│   │   └── messages.js           # 사용자에게 보여지는 메시지
│   ├── features/                 # 기능별 모듈 (핵심!)
│   │   ├── auth/                 # 인증 및 사용자 관리 (2.1)
│   │   │   ├── components/       # 인증 관련 UI 컴포넌트
│   │   │   │   ├── SocialLoginButtons.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── SignupForm.jsx
│   │   │   │   └── StoreRegistrationForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.js    # 로그인 상태, 유저 정보 등 접근
│   │   │   ├── utils/
│   │   │   │   └── authUtils.js  # 토큰 저장/삭제, 로컬 스토리지 관리
│   │   │   ├── authSlice.js      # RTK Slice (사용자 정보, 로그인 상태)
│   │   │   └── withAuth.jsx      # HOC for protecting routes (2.5)
│   │   ├── dashboard/            # 메인 대시보드 (2.2)
│   │   │   ├── components/
│   │   │   │   ├── AnnouncementCard.jsx
│   │   │   │   ├── OngoingOrderSummary.jsx
│   │   │   │   └── PromotionBanner.jsx
│   │   │   └── dashboardSlice.js # (필요 시) 대시보드 관련 상태 관리
│   │   ├── orders/               # 주문 생성 및 조회 (2.4)
│   │   │   ├── components/
│   │   │   │   ├── NewOrderForm.jsx
│   │   │   │   ├── OngoingOrderStatus.jsx
│   │   │   │   ├── PastOrderList.jsx
│   │   │   │   └── ReorderButton.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useOrderActions.js # 주문 생성, 재주문 로직
│   │   │   └── ordersSlice.js    # (필요 시) 주문 관련 상태 관리
│   │   ├── my-page/              # 내 정보, 매장 관리 (2.1.2, 2.3.1 - 매장 전환)
│   │   │   ├── components/
│   │   │   │   ├── UserProfileForm.jsx
│   │   │   │   ├── StoreManagementList.jsx
│   │   │   │   └── StoreEditForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useStoreSelection.js # 현재 선택된 매장 관리
│   │   │   └── myPageSlice.js    # (필요 시) 내 정보, 매장 리스트 상태
│   │   └── (기타 기능들...)
│   ├── hooks/                    # 앱 전반에서 사용되는 커스텀 훅 (비즈니스 로직과 무관)
│   │   ├── useDebounce.js
│   │   ├── useLocalStorage.js
│   │   └── useMediaQuery.js
│   ├── lib/                      # 외부 라이브러리 설정, 인스턴스
│   │   ├── axios.js              # Axios 인스턴스 설정 (interceptors 포함)
│   │   └── queryClient.js        # React Query 사용 시
│   ├── pages/                    # 라우팅 되는 최상위 컴포넌트 (주로 features 컴포넌트 조합)
│   │   ├── auth/                 # 인증 관련 페이지
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── HomePage.jsx          # 메인 대시보드 (features/dashboard 사용)
│   │   ├── OrderPage.jsx         # 주문 (features/orders 사용)
│   │   ├── OrderHistoryPage.jsx  # 주문내역 (features/orders 사용)
│   │   ├── MyInfoPage.jsx        # 내 정보 (features/my-page 사용)
│   │   └── NotFoundPage.jsx
│   ├── routes/                   # React Router 설정
│   │   ├── index.js              # 모든 라우트 정의 및 보호 (withAuth HOC 적용)
│   │   └── PublicRoutes.jsx      # 인증 불필요 라우트
│   │   └── PrivateRoutes.jsx     # 인증 필요 라우트
│   ├── store/                    # Redux Toolkit (상태 관리)
│   │   ├── index.js              # Redux 스토어 설정
│   │   └── rootReducer.js        # 모든 slice와 API reducer 통합
│   ├── styles/                   # 전역 스타일 및 Tailwind CSS 설정
│   │   ├── index.css             # Tailwind CSS import, 전역 스타일 정의
│   │   └── base.css              # Reset, 기본 폰트 등
│   ├── utils/                    # 범용 유틸리티 함수
│   │   ├── helpers.js            # 일반적인 유틸 (날짜 포맷, 가격 포맷 등)
│   │   ├── validators.js         # 입력 유효성 검사
│   │   └── device.js             # 모바일 환경 감지 등
│   ├── App.jsx                   # 메인 애플리케이션 컴포넌트
│   └── main.jsx                  # 애플리케이션 엔트리 포인트 (ReactDOM.render)
├── vite.config.js                # Vite 설정 파일
├── tailwind.config.js            # Tailwind CSS 설정 파일
├── postcss.config.js             # PostCSS 설정 파일
├── jsconfig.json (or tsconfig.json) # VSCode alias 설정
├── package.json
└── README.md
```

---

## 각 디렉토리 및 파일 설명

### `public/`
*   정적 파일(이미지, HTML 등)을 위한 디렉토리입니다. 빌드 시 그대로 복사됩니다.

### `src/`

#### `api/`
*   **API 통신 로직을 정의**합니다. [**Redux Toolkit Query (RTK Query)**](https://redux-toolkit.js.org/rtk-query/overview)를 사용하는 것을 강력히 권장합니다.
*   **`baseApi.js`**: 모든 API 엔드포인트가 상속할 기본 API 정의 (baseUrl, 인증 헤더 등).
*   **`authApi.js`**: 로그인, 회원가입, 토큰 갱신 등 인증 관련 API.
*   **`ordersApi.js`**: 주문 생성, 조회, 수정 등 주문 관련 API.
*   **`storeApi.js`**: 매장 정보 등록, 수정, 조회 등 매장 관련 API.

#### `assets/`
*   프로젝트에 사용되는 **모든 정적 자원**을 보관합니다.
    *   `images/`: 로고, 프로모션 배너 이미지 등.
    *   `icons/`: SVG 아이콘 등.
    *   `fonts/`: 커스텀 폰트 파일.

#### `components/`
*   **애플리케이션 전반에서 재사용될 수 있는 UI 컴포넌트**들을 모아둡니다. 특정 기능에 종속되지 않습니다.
    *   **`common/`**: `Button`, `InputField`, `Modal`, `Spinner` 등 가장 기본적인 UI 요소.
    *   **`layout/`**: 페이지의 전체적인 레이아웃을 구성하는 컴포넌트.
        *   `MainLayout.jsx`: 상단 헤더, 하단 탭 내비게이션, 그리고 페이지 콘텐츠 영역을 포함하는 메인 레이아웃.
        *   `AuthLayout.jsx`: 로그인/회원가입 페이지를 위한 전용 레이아웃.
    *   **`navigation/`**: 내비게이션 관련 컴포넌트.
        *   `TopHeader.jsx`: 현재 선택된 매장 정보 및 매장 전환 드롭다운을 포함.
        *   `BottomTabNavigator.jsx`: 하단 탭 내비게이션 (`홈`, `주문`, `주문내역`, `내정보`).
    *   **`ui/`**: 로직 없이 순수하게 시각적 요소만 담당하는 UI 컴포넌트 (`Card`, `Dropdown`, `ProgressBar`).

#### `constants/`
*   애플리케이션 전반에서 사용되는 **변하지 않는 값들**을 정의합니다.
    *   `api.js`: API 엔드포인트 URL, 타임아웃 설정 등.
    *   `app.js`: 지원하는 프랜차이즈 리스트 (`노랑통닭`, `쌀통닭`, `정상카츠`), 앱 버전 정보 등.
    *   `messages.js`: 사용자에게 표시되는 에러 메시지, 성공 메시지 등.

#### `features/`
*   **가장 중요한 디렉토리**로, **기능 단위로 모듈화**합니다. 각 서브 디렉토리에는 해당 기능과 관련된 모든 컴포넌트, 훅, 상태 관리 로직, 유틸리티 등이 포함됩니다.
    *   **`auth/`**: 인증 및 사용자 관리 기능.
        *   `components/`: `SocialLoginButtons`, `LoginForm`, `SignupForm`, `StoreRegistrationForm` 등.
        *   `hooks/`: `useAuth` (사용자 로그인 상태, 정보 접근).
        *   `utils/`: `authUtils.js` (JWT 토큰 관리, 로컬 스토리지 처리).
        *   `authSlice.js`: Redux Toolkit `slice`를 사용하여 사용자 정보, 로그인 상태 관리.
        *   **`withAuth.jsx`**: 인증되지 않은 사용자의 접근을 제한하는 HOC (Higher-Order Component).
    *   **`dashboard/`**: 메인 대시보드 기능.
        *   `components/`: `AnnouncementCard` (공지사항), `OngoingOrderSummary` (진행 중인 주문 요약), `PromotionBanner`.
    *   **`orders/`**: 주문 생성, 진행 중인 주문 조회, 과거 주문 내역 조회 및 재주문 기능.
        *   `components/`: `NewOrderForm`, `OngoingOrderStatus` (주문 상태, 예상 도착 시간), `PastOrderList`, `ReorderButton`.
        *   `hooks/`: `useOrderActions` (주문 관련 비즈니스 로직).
    *   **`my-page/`**: 사용자 정보 관리 및 매장 정보 관리 기능.
        *   `components/`: `UserProfileForm`, `StoreManagementList` (매장 목록 및 동적 추가/삭제), `StoreEditForm`.
        *   `hooks/`: `useStoreSelection` (현재 선택된 매장 관리 및 전환 로직).

#### `hooks/`
*   **애플리케이션 전반에서 재사용될 수 있는 범용적인 커스텀 훅**들을 모아둡니다. (`features` 내부에 있는 훅은 해당 기능에 특화된 훅입니다.)
    *   `useDebounce`, `useLocalStorage`, `useMediaQuery` 등.

#### `lib/`
*   Axios 인스턴스 설정, React Query 클라이언트 설정 등 **외부 라이브러리 관련 설정 및 초기화**를 담당합니다.
    *   `axios.js`: 요청/응답 인터셉터를 포함한 Axios 인스턴스.
    *   `queryClient.js`: (React Query 사용 시) `QueryClient` 인스턴스.

#### `pages/`
*   **React Router에 직접 연결되는 최상위 컴포넌트**들입니다.
*   주로 `features` 디렉토리의 컴포넌트들을 조합하여 페이지를 구성합니다.
    *   `auth/LoginPage.jsx`, `auth/SignupPage.jsx`
    *   `HomePage.jsx` (대시보드)
    *   `OrderPage.jsx` (새 주문 및 진행 중인 주문)
    *   `OrderHistoryPage.jsx` (과거 주문 내역)
    *   `MyInfoPage.jsx` (내 정보 및 매장 관리)
    *   `NotFoundPage.jsx`

#### `routes/`
*   **React Router의 라우팅 설정**을 관리합니다.
    *   `index.js`: 모든 라우트를 정의하고 `BrowserRouter`, `Routes`, `Route` 컴포넌트를 사용하여 앱의 라우트 맵을 구성합니다.
    *   **`PrivateRoutes.jsx`**: `withAuth` HOC를 사용하여 인증이 필요한 라우트들을 묶어 보호합니다.
    *   **`PublicRoutes.jsx`**: 인증 없이 접근 가능한 라우트들입니다.

#### `store/`
*   [**Redux Toolkit**](https://redux-toolkit.js.org/)을 사용하여 전역 상태를 관리합니다.
    *   `index.js`: Redux 스토어를 설정하고, 모든 `slice`와 `RTK Query` API reducer를 통합합니다.
    *   `rootReducer.js`: (옵션) 여러 `slice`를 하나로 합치는 경우.

#### `styles/`
*   **전역 스타일 및 Tailwind CSS 설정**을 담당합니다.
    *   `index.css`: Tailwind CSS `@tailwind` 지시어와 전역적으로 적용될 커스텀 스타일을 정의합니다.
    *   `base.css`: CSS Reset, 기본 폰트 설정 등.

#### `utils/`
*   **애플리케이션 전반에서 사용될 수 있는 범용 유틸리티 함수**들을 모아둡니다.
    *   `helpers.js`: 날짜 포맷팅, 금액 포맷팅, 문자열 처리 등 일반적인 도우미 함수.
    *   `validators.js`: 이메일, 전화번호, 비밀번호 등 입력 값 유효성 검사 함수.
    *   `device.js`: 모바일 환경 감지 등 기기 관련 유틸리티.

#### `App.jsx`
*   애플리케이션의 최상위 컴포넌트입니다. `Router`와 `MainLayout`을 감싸고, `Redux Provider` 등 전역적인 설정을 담당합니다.

#### `main.jsx`
*   애플리케이션의 엔트리 포인트입니다. `ReactDOM.createRoot`를 사용하여 `App` 컴포넌트를 렌더링합니다.

### 설정 파일들

*   **`vite.config.js`**: Vite 빌드 도구 설정 파일입니다. `@`와 같은 경로 별칭(alias) 설정 및 개발 서버 프록시 설정 등을 정의합니다.
    ```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import path from 'path';

    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      server: {
        proxy: {
          '/api': { // API 요청을 백엔드 서버로 프록시
            target: 'http://localhost:8080', // 백엔드 서버 주소
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    });
    ```
*   **`tailwind.config.js`**: Tailwind CSS 설정 파일입니다. 커스텀 색상, 폰트, 반응형 브레이크포인트 등을 정의합니다. 모바일 웹뷰 앱이므로 `screens` 설정을 모바일 우선으로 조정할 수 있습니다.
*   **`postcss.config.js`**: PostCSS 설정 (Tailwind CSS와 함께 사용됨).
*   **`jsconfig.json` (or `tsconfig.json`)**: VS Code 등 IDE에서 경로 별칭(alias)을 인식하도록 설정합니다.

---

## 주요 아키텍처 및 구현 고려사항

1.  **Redux Toolkit (RTK) + RTK Query**:
    *   **상태 관리**: `Redux Toolkit`으로 사용자 정보, 매장 목록, 주문 내역 등 전역 상태를 효율적으로 관리합니다.
    *   **데이터 페칭**: `RTK Query`는 API 계층을 구성하고 캐싱, 재요청, 로딩 상태 관리 등을 자동화하여 백엔드와의 통신을 매우 간편하게 만듭니다. `api/` 디렉토리와 `store/` 디렉토리에서 이점을 활용합니다.

2.  **Tailwind CSS**:
    *   Utility-first CSS 프레임워크로, 빠르게 반응형 UI를 구축하고 일관된 디자인 시스템을 유지하는 데 유리합니다. 특히 모바일 웹뷰에서는 작은 스타일 변경에도 효과적입니다.

3.  **기능 중심(Feature-driven) 구조**:
    *   `features/` 디렉토리 아래에 각 기능을 독립적인 모듈로 구성하여, 코드의 응집도를 높이고 다른 기능에 미치는 영향을 최소화합니다. 새로운 기능 추가나 기존 기능 수정이 용이합니다.

4.  **인증 및 접근 제어 (`withAuth` HOC)**:
    *   `features/auth/withAuth.jsx` HOC를 생성하여 인증된 사용자만 특정 페이지에 접근할 수 있도록 보호합니다.
    *   `routes/PrivateRoutes.jsx`에서 이 HOC를 사용하여 인증이 필요한 모든 라우트를 감싸줍니다.
    *   **자동 로그인/로그인 상태 영속성**: `authSlice.js` 또는 `features/auth/utils/authUtils.js`에서 `localStorage`를 활용하여 토큰을 저장하고, 앱 초기 로드 시 `withAuth` HOC나 `App.jsx`에서 토큰 유효성을 검사하여 자동 로그인 처리합니다.

5.  **모바일 웹뷰 최적화**:
    *   `components/navigation/BottomTabNavigator.jsx`와 `TopHeader.jsx`는 모바일 앱의 익숙한 UI 패턴을 따릅니다.
    *   `tailwind.config.js`에서 모바일 우선(mobile-first) 디자인을 위한 `screens` 설정을 고려합니다.
    *   `meta viewport` 설정을 `public/index.html`에 추가하여 반응형 동작을 보장합니다.

6.  **경로 별칭(Alias)**:
    *   `vite.config.js`와 `jsconfig.json`에 `@`를 `src/`로 매핑하여 `import` 문을 깔끔하게 유지하고 가독성을 높입니다. (예: `import Button from '@/components/common/Button';` )

---

이 구조는 작은 규모의 앱부터 확장 가능한 복잡한 앱까지 유연하게 대응할 수 있도록 설계되었습니다. 요구사항 명세서의 모든 기능들을 체계적으로 구현하고 관리하는 데 큰 도움이 될 것입니다.

============================================================
📌 주요 차이점 요약
============================================================
choeeun-u@choeeun-uui-MacBookAir adk-js % 
