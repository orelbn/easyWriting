import { FunctionComponent } from "react";

const Result: FunctionComponent<{ prompt: string; response: string }> = ({
  prompt,
  response,
}) => {
  return (
    <li className="p-7 mb-7 box-content animate-fadeIn-response shadow-lg rounded-md bg-gray-100">
      <div className="flex flex-col xsm:flex-row">
        <div className="w-1/4">
          <h3 className="text-l text-black font-bold">Prompt: </h3>
        </div>
        <div className="w-3/4">
          <p className="text-m break-words font-serif">{prompt}</p>
        </div>
      </div>

      <div className="flex flex-col xsm:flex-row">
        <div className="w-1/4">
          <h3 className="text-l text-black font-bold">Response: </h3>
        </div>
        <div className="w-3/4">
          <p className="text-m break-words font-serif">{response}</p>
        </div>
      </div>
    </li>
  );
};

export default Result;
