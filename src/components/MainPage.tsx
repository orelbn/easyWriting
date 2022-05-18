import { useState, useEffect, FunctionComponent } from "react";
import { generateResponse } from "../scripts/fetchOpenAi";
import { OpenAIAPIResponse } from "../types/APIResponseTypes";
import getSavedResults from "../scripts/getSavedResults";
import Result from "./Result";

interface Results {
  prompt: string;
  response: string;
}

const MainPage: FunctionComponent = () => {
  const [prompt, setPrompt] = useState<string | null>();
  const [results, setResults] = useState<Array<Results>>(getSavedResults());
  const [engine, setEngine] = useState("text-curie-001");
  const Engines = [
    "text-curie-001",
    "text-davinci-002",
    "text-babbage-001",
    "text-ada-001",
  ];

  // request is utilized as a toggle to trigger request
  const [request, setRequest] = useState(false);

  const handleClick = () => {
    const input = document.getElementById("textarea") as HTMLTextAreaElement;
    if (input.value) {
      setPrompt(input.value);
      setRequest(!request);
    }
  };

  const handleClear = () => {
    localStorage.clear();
    setResults([]);
  };

  useEffect(() => {
    handleResponse().catch((e) => console.log(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  const handleResponse = async () => {
    if (prompt) {
      const res = (await generateResponse(
        prompt,
        engine
      )) as unknown as OpenAIAPIResponse;
      if (res) {
        const response = res.data.choices[0].text;
        setResults([{ prompt: prompt, response: response }].concat(results));
      } else {
        setResults([
          {
            prompt: "If your seeing this the API key has been revoked",
            response: "Please contact me at contactorelbn@gmail.com",
          },
        ]);
      }
    }
  };

  return (
    <div className="mx-auto w-2/3 p-5 mt-10 mb-10 font-sans rounded-xl shadow-lg bg-green-300">
      <h1 className="text-3xl text-black font-bold mb-2">Fun with AI</h1>
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
          <button
            onClick={handleClick}
            className="bg-blue-800 min-w-fit max-w-xs self-center h-1/2 w-1/5 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </section>
      <h2 className="text-2xl text-black font-bold mb-7">Responses</h2>
      <section className="flex flex-col">
        {results.map((result, index) => (
          <Result
            key={index}
            prompt={result.prompt}
            response={result.response}
          />
        ))}
        {results.length > 0 && (
          <button
            onClick={handleClear}
            className="bg-blue-800 self-center min-w-fit max-w-xs w-1/5 text-white font-bold py-2 px-4 rounded"
          >
            Clear Results
          </button>
        )}
      </section>
    </div>
  );
};

export default MainPage;
