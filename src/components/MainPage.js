import { useState, useEffect } from "react";
import { generateResponse } from "../scripts/fetchOpenAi";
import Result from "./Result";

const MainPage = () => {
  const [prompt, setPrompt] = useState();
  const [results, setResults] = useState([]);

  const handleClick = () => {
    let input = document.getElementById("textarea");
    if (input.value) {
      setPrompt(input.value);
    }
  };

  useEffect(() => {
    handleResponse();
  }, [prompt]);

  const handleResponse = async () => {
    if (prompt) {
      // const response = await generateResponse(prompt);
      // console.log(response);
      setResults(
        [{ prompt: prompt, response: prompt + ", true!" }].concat(results)
      );
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
          maxLength="1024"
          className=" resize-none overflow-auto mb-1 sm:h-72 lg:h-96 xl:h-128 rounded-lg"
          type="text"
          placeholder="Enter up to 1024 characters!"
          id="textarea"
        ></textarea>
        <button
          onClick={handleClick}
          className="bg-blue-800 self-end min-w-fit max-w-xs w-1/5 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
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
      </section>
    </div>
  );
};

export default MainPage;