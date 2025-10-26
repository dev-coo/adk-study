import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

class GeminiClient {
  constructor(apiKey = process.env.GEMINI_API_KEY || "AIzaSyApsNsVFJxgrTxJfe8dX8bH4lWPz6-F8wE") {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = null;
    this.chat = null;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getModel(modelName = "gemini-1.5-flash", config = {}) {
    const defaultConfig = {
      maxOutputTokens: 2048,
      temperature: 0.9,
      topP: 1,
      topK: 1,
    };
    
    this.model = this.genAI.getGenerativeModel({ 
      model: modelName,
      generationConfig: { ...defaultConfig, ...config }
    });
    return this.model;
  }

  startChat(history = [], generationConfig = {}) {
    if (!this.model) {
      this.getModel();
    }
    
    const defaultConfig = {
      maxOutputTokens: 2048,
    };
    
    this.chat = this.model.startChat({
      history,
      generationConfig: { ...defaultConfig, ...generationConfig },
    });
    return this.chat;
  }

  async sendMessage(message) {
    if (!this.chat) {
      this.startChat();
    }
    return await this.chat.sendMessage(message);
  }

  async sendMessageStream(message) {
    if (!this.chat) {
      this.startChat();
    }
    return await this.chat.sendMessageStream(message);
  }

  async generateContent(prompt) {
    if (!this.model) {
      this.getModel();
    }
    return await this.model.generateContent(prompt);
  }

  async generateContentStream(prompt) {
    if (!this.model) {
      this.getModel();
    }
    return await this.model.generateContentStream(prompt);
  }

  prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  close() {
    this.rl.close();
  }

  async runChatLoop() {
    console.log("🤖 Gemini Chat 시작! ('exit' 또는 'quit'를 입력하면 종료됩니다)");
    console.log("_".repeat(80));
    
    if (!this.chat) {
      this.startChat();
    }

    while (true) {
      const userInput = await this.prompt("\n👤 You: ");
      
      if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
        console.log("\n👋 채팅을 종료합니다. 안녕히 가세요!");
        this.close();
        break;
      }

      try {
        console.log("\n🤖 Gemini: ");
        const result = await this.sendMessageStream(userInput);
        
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          process.stdout.write(chunkText);
        }
        console.log("\n" + "_".repeat(80));
        
      } catch (error) {
        console.error("\n❌ 오류가 발생했습니다:", error.message);
        console.log("_".repeat(80));
      }
    }
  }
}

export default GeminiClient;