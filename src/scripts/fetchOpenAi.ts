import axios from "axios";
import type { OpenAIAPIResponse } from "../types/APIResponseTypes";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const createMockResponse = (
  prompt: string,
  engine: string,
): OpenAIAPIResponse => {
  const preview = prompt.length > 220 ? `${prompt.slice(0, 220)}…` : prompt;

  return {
    data: {
      choices: [
        {
          text:
            `Mock response (no API key configured)\n` +
            `Engine: ${engine}\n\n` +
            `Prompt preview:\n${preview}\n\n` +
            `Tip: set VITE_OPENAI_API_KEY in .env.local to use the real API.\n`,
          index: 0,
          logprobs: null,
          finish_reason: "stop",
        },
      ],
      created: Math.floor(Date.now() / 1000),
      id: "mock-completion",
      object: "text_completion",
      model: "mock",
    },
  };
};

export const generateResponse = async (prompt: string, engine: string) => {
  if (!apiKey) {
    console.warn(
      "Missing VITE_OPENAI_API_KEY; using mock response. (Client-side keys are not safe for production.)",
    );
    return createMockResponse(prompt, engine);
  }

  const options = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.3,
    presence_penalty: 0.3,
  };

  const url = `https://api.openai.com/v1/engines/${engine}/completions`;

  const header = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  return axios
    .post(url, options, {
      headers: header,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.status);
      console.log(error.response.data.error);
      if (error.response.status == 401) {
        return null;
      }
    });
};
