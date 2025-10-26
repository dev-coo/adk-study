import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE");

// 실제 온도를 가져오는 함수 (예제용 모의 데이터)
async function getCurrentTemperature(args) {
  const { location } = args;
  
  // 실제로는 날씨 API를 호출해야 하지만, 예제를 위해 모의 데이터 반환
  const mockTemperatures = {
    "서울": 15,
    "부산": 18,
    "제주": 20,
    "대구": 16,
    "인천": 14,
    "광주": 17,
    "대전": 15
  };
  
  const temp = mockTemperatures[location] || Math.floor(Math.random() * 30);
  
  return {
    location: location,
    temperature: temp,
    unit: "°C",
    message: `${location}의 현재 온도는 ${temp}°C입니다.`
  };
  
  // 실제 API 사용 예시 (OpenWeatherMap):
  // const API_KEY = "your_openweather_api_key";
  // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric&lang=kr`);
  // const data = await response.json();
  // return {
  //   location: location,
  //   temperature: Math.round(data.main.temp),
  //   unit: "°C",
  //   message: `${location}의 현재 온도는 ${Math.round(data.main.temp)}°C입니다.`
  // };
}

// 함수 선언 정의
const weatherFunctionDeclaration = {
  name: 'get_current_temperature',
  description: '특정 지역의 현재 온도를 가져옵니다.',
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: '도시 이름 (예: 서울, 부산, 제주)',
      },
    },
    required: ['location'],
  },
};

// 도구(함수)를 포함한 모델 설정
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  tools: [{
    functionDeclarations: [weatherFunctionDeclaration]
  }],
});

// 요청 보내기 (함수 호출 모드 강제)
const result = await model.generateContent({
  contents: [{
    role: "user",
    parts: [{
      text: "서울의 현재 온도는 몇 도야?"
    }]
  }],
  toolConfig: {
    functionCallingConfig: {
      mode: "ANY"  // 함수 호출 강제
    }
  }
});
const response = result.response;

// 응답에서 함수 호출 확인
const functionCalls = response.functionCalls();
if (functionCalls && functionCalls.length > 0) {
  const functionCall = functionCalls[0];
  console.log(`호출할 함수: ${functionCall.name}`);
  console.log(`전달인자: ${JSON.stringify(functionCall.args)}`);
  // 실제 앱에서는 여기서 실제 함수를 호출합니다:
  const result = await getCurrentTemperature(functionCall.args);
  console.log(result);
} else {
  console.log("응답에서 함수 호출을 찾을 수 없습니다.");
  console.log(response.text());
}