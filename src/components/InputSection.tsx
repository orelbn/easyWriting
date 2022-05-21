import { useState, useEffect, FunctionComponent } from "react";
import { generateResponse } from "../scripts/fetchOpenAi";
import { OpenAIAPIResponse } from "../types/APIResponseTypes";
import SubmitButton from "./SubmitButton";

const InputSection: FunctionComponent<{
  handleResults: (prompt: string, response: string) => void;
}> = ({ handleResults }) => {
  const [prompt, setPrompt] = useState<string | null>();
  const [processing, setProcessing] = useState(false);
  const [engine, setEngine] = useState("text-curie-001");
  const Engines = [
    "text-curie-001",
    "text-davinci-002",
    "text-babbage-001",
    "text-ada-001",
  ];

  // request is utilized as a toggle to trigger request
  const [request, setRequest] = useState(false);

  useEffect(() => {
    handleResponse().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  const handleClick = () => {
    const input = document.getElementById("textarea") as HTMLTextAreaElement;
    if (input.value) {
      setProcessing(true);
      setPrompt(input.value);
      setRequest(!request);
    }
  };

  const handleResponse = async () => {
    if (prompt) {
      const res = (await generateResponse(
        prompt,
        engine
      )) as unknown as OpenAIAPIResponse;
      if (res) {
        const response = res.data.choices[0].text;
        handleResults(prompt, response);
      } else {
        handleResults(
          "If your seeing this, there is an issue with your API key",
          `Please generate a new API key and ensure you proprely set up a .env file! 
          For instructions go to https://github.com/orelbn/easyWriting`
        );
      }
      setProcessing(false);
    }
  };
  return (
    <section className="flex flex-col mb-6">
      <label htmlFor="Entering Promopt" className="text-black  font-medium">
        Enter Prompt
      </label>
      <textarea
        maxLength={1024}
        className=" resize-none overflow-auto mb-1 sm:h-72 lg:h-96 rounded-lg"
        placeholder="Enter up to 1024 characters!"
        id="textarea"
      ></textarea>
      <div className="flex flex-col xsm:flex-row justify-between">
        <label htmlFor="Engine">
          Pick Engine
          <select
            id="engine"
            value={engine}
            onChange={(e) => {
              setEngine(e.target.value);
            }}
            onBlur={(e) => {
              setEngine(e.target.value);
            }}
            className="w-full bg-slate-100 xsm:w-60 mb-5 block"
          >
            {Engines.map((engine) => (
              <option key={engine} value={engine}>
                {engine}
              </option>
            ))}
          </select>
        </label>
        <SubmitButton handleClick={handleClick} processing={processing} />
      </div>
    </section>
  );
};

export default InputSection;
