import { FunctionComponent, useEffect, useState } from "react";
import getSavedResults from "../scripts/getSavedResults";
import InputSection from "./InputSection";
import Responses from "./Responses";

interface IResult {
  prompt: string;
  response: string;
}

const MainPage: FunctionComponent = () => {
  const [results, setResults] = useState<Array<IResult>>(() =>
    getSavedResults(),
  );

  const handleResults = (prompt: string, response: string) => {
    setResults((prevResults) =>
      [{ prompt: prompt, response: response }].concat(prevResults),
    );
  };

  const clearResults = () => {
    localStorage.clear();
    setResults([]);
  };

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-200 text-black border-b border-amber-300">
        <div className="mx-auto w-2/3 p-2 text-sm font-semibold">
          Local development only: this app sends an OpenAI API key from the
          browser (not safe for production).
        </div>
      </div>

      <div className="mx-auto w-2/3 p-5 mt-20 mb-10 font-sans rounded-md shadow-lg bg-slate-200">
        <h1 className="text-3xl text-black font-bold mb-2">Fun with AI</h1>
        <InputSection handleResults={handleResults} />
        <Responses handleClear={clearResults} results={results} />
      </div>
    </>
  );
};

export default MainPage;
