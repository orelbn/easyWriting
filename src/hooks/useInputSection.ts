import { useState } from "react";
import { generateResponse } from "../scripts/fetchOpenAi";
import type { OpenAIAPIResponse } from "../types/APIResponseTypes";

export const useInputSection = (
  handleResults: (prompt: string, response: string) => void,
) => {
  const [promptDraft, setPromptDraft] = useState("");
  const [processing, setProcessing] = useState(false);
  const [engine, setEngine] = useState("text-curie-001");

  const Engines = [
    "text-curie-001",
    "text-davinci-002",
    "text-babbage-001",
    "text-ada-001",
  ];

  const handleClick = async () => {
    const prompt = promptDraft.trim();
    if (!prompt || processing) return;

    setProcessing(true);
    try {
      const res = (await generateResponse(
        prompt,
        engine,
      )) as unknown as OpenAIAPIResponse | null;

      if (res) {
        const response = res.data.choices[0].text;
        handleResults(prompt, response);
      } else {
        handleResults(
          "There is an issue with your API key",
          "Please generate a new API key and ensure you properly set up a local .env file. See README.md.",
        );
      }
    } finally {
      setProcessing(false);
    }
  };

  return {
    promptDraft,
    setPromptDraft,
    processing,
    engine,
    setEngine,
    Engines,
    handleClick,
  };
};
