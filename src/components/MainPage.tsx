import { useState, useEffect, FunctionComponent } from "react";
import getSavedResults from "../scripts/getSavedResults";
import InputSection from "./InputSection";
import Responses from "./Responses";

interface IResult {
  prompt: string;
  response: string;
}

const MainPage: FunctionComponent = () => {
  const [results, setResults] = useState<Array<IResult>>(getSavedResults());

  const handleResults = (prompt: string, response: string) => {
    setResults([{ prompt: prompt, response: response }].concat(results));
  };

  const clearResults = () => {
    localStorage.clear();
    setResults([]);
  };

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  return (
    <div className="mx-auto w-2/3 p-5 mt-10 mb-10 font-sans rounded-md shadow-lg bg-slate-200">
      <h1 className="text-3xl text-black font-bold mb-2">Fun with AI</h1>
      <InputSection handleResults={handleResults} />
      <Responses handleClear={clearResults} results={results} />
    </div>
  );
};

export default MainPage;
