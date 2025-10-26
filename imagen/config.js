import aiClient from "../utils/api-client.js";

export const genAI = aiClient.getImagenClient();

export const IMAGE_GENERATION_CONFIG = {
  model: "imagen-3.0-generate-002",
  defaultParams: {
    numberOfImages: 1,
    aspectRatio: "1:1"
  }
};

export const SUPPORTED_ASPECT_RATIOS = [
  "1:1",
  "3:4",
  "4:3",
  "9:16",
  "16:9"
];

export const OUTPUT_DIR = "./imagen/output";