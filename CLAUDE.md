# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js application that interfaces with Google's Generative AI (Gemini) API. The project uses ES modules (`type: "module"` in package.json) and implements a chat interaction with the Gemini 2.5 Flash model.

## Commands

### Installation
```bash
npm install
```

### Running the Application
```bash
node app.js
```

### Testing
Currently no test framework is configured. The package.json test script returns an error message.

## Architecture

### Core Components

- **app.js**: Main application file that:
  - Initializes the Google Generative AI client with an API key
  - Creates a chat session with the Gemini 2.5 Flash model
  - Sends streaming messages and processes responses
  - Contains hardcoded conversation history for context

### Key Dependencies

- **@google/genai**: Google's official Generative AI SDK for JavaScript
  - Used for interfacing with Gemini models
  - Supports streaming responses via async iterators

## Important Notes

- **API Key Security**: The API key is currently hardcoded in app.js:3. This should be moved to environment variables for security.
- **ES Modules**: This project uses ES module syntax (`import`/`export`) rather than CommonJS (`require`)
- **No Build Process**: The project runs directly via Node.js without transpilation or bundling
- **Streaming Responses**: The application uses streaming API calls (`sendMessageStream`) to handle AI responses incrementally