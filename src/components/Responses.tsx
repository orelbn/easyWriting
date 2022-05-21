import { FunctionComponent } from "react";
import Response from "./Response";

interface IResult {
  prompt: string;
  response: string;
}

const Responses: FunctionComponent<{
  handleClear: () => void;
  results: Array<IResult>;
}> = ({ handleClear, results }) => {
  return (
    <section className="flex flex-col">
      {results.length > 0 && (
        <h2 className="text-2xl text-black font-bold mb-7">Responses</h2>
      )}
      <ul>
        {results.map((result, index) => (
          <Response
            key={results.length - index}
            prompt={result.prompt}
            response={result.response}
          />
        ))}
      </ul>
      {results.length > 0 && (
        <button
          onClick={handleClear}
          className="bg-blue-800 self-center min-w-fit max-w-xs w-1/5 text-white font-bold py-2 px-4 rounded"
        >
          Clear Results
        </button>
      )}
    </section>
  );
};

export default Responses;
