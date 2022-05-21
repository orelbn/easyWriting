import Spinner from "./Spinner";
import { FunctionComponent } from "react";

const SubmitButton: FunctionComponent<{
  handleClick: () => void;
  processing: boolean;
}> = ({ handleClick, processing }) => {
  return (
    <button
      onClick={handleClick}
      type="submit"
      className={`${
        processing ? "bg-indigo-600" : "bg-blue-800"
      } min-w-fit max-w-xs self-center h-1/2 w-1/5 text-white font-bold py-2 px-4 rounded`}
      disabled={processing}
    >
      {processing === true && <Spinner />}
      {processing ? "Processing..." : "Submit"}
    </button>
  );
};

export default SubmitButton;
