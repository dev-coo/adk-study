import aiClient from "./utils/api-client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log("🤖 Gemini Chat 시작! ('exit' 또는 'quit'를 입력하면 종료됩니다)");
  console.log("_".repeat(80));

  const chat = await aiClient.startChat();

  while (true) {
    const userInput = await prompt("\n👤 You: ");
    
    if (userInput.toLowerCase() === "exit" || userInput.toLowerCase() === "quit") {
      console.log("\n👋 채팅을 종료합니다. 안녕히 가세요!");
      rl.close();
      break;
    }

    try {
      console.log("\n🤖 Gemini: ");
      const result = await chat.sendMessageStream(userInput);
      
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

await main();