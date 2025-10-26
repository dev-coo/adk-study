import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

class AIClient {
  constructor() {
    this.apiKeys = {
      gemini: "AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE",
      imagen: "AIzaSyC_67PJlxDkwqdcv-s0KoBVRZXw5lvAVJ0"
    };

    this.geminiClient = null;
    this.imagenClient = null;
  }

  getGeminiClient() {
    if (!this.geminiClient) {
      this.geminiClient = new GoogleGenerativeAI(this.apiKeys.gemini);
    }
    return this.geminiClient;
  }

  getImagenClient() {
    if (!this.imagenClient) {
      this.imagenClient = new GoogleGenAI({
        apiKey: this.apiKeys.imagen
      });
    }
    return this.imagenClient;
  }

  async generateText(prompt, modelName = "gemini-1.5-flash") {
    try {
      const genAI = this.getGeminiClient();
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("텍스트 생성 실패:", error);
      throw error;
    }
  }

  async generateImages(prompt, config = {}) {
    try {
      const ai = this.getImagenClient();
      const defaultConfig = {
        numberOfImages: 1,
        aspectRatio: "1:1"
      };

      const response = await ai.models.generateImages({
        model: config.model || 'imagen-3.0-generate-002',
        prompt: prompt,
        config: { ...defaultConfig, ...config }
      });

      return response;
    } catch (error) {
      console.error("이미지 생성 실패:", error);
      throw error;
    }
  }

  async startChat(modelName = "gemini-1.5-flash", history = []) {
    const genAI = this.getGeminiClient();
    const model = genAI.getGenerativeModel({ model: modelName });

    return model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });
  }
}

const aiClient = new AIClient();

export default aiClient;