import { FunctionComponent } from "react";
import { useInputSection } from "../hooks/useInputSection";
import CustomSelect from "./CustomSelect";
import SubmitButton from "./SubmitButton";

const InputSection: FunctionComponent<{
  handleResults: (prompt: string, response: string) => void;
}> = ({ handleResults }) => {
  const {
    promptDraft,
    setPromptDraft,
    processing,
    engine,
    setEngine,
    Engines,
    handleClick,
  } = useInputSection(handleResults);

  return (
    <section className="flex flex-col mb-6">
      <label htmlFor="textarea" className="text-black font-medium">
        Enter Prompt
      </label>
      <textarea
        maxLength={1024}
        className="w-full resize-none overflow-auto mb-2 mt-1 sm:h-72 lg:h-96 rounded-lg border border-slate-300 bg-white p-3 text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 disabled:bg-slate-100 disabled:opacity-60"
        placeholder="Enter up to 1024 characters!"
        id="textarea"
        value={promptDraft}
        onChange={(e) => setPromptDraft(e.target.value)}
        disabled={processing}
      />
      <div className="flex flex-col xsm:flex-row justify-between">
        <label htmlFor="engine" className="block">
          <span>Pick Engine</span>
          <div className="mt-1 w-full xsm:w-60 mb-5">
            <CustomSelect
              options={Engines}
              value={engine}
              onChange={setEngine}
              disabled={processing}
            />
          </div>
        </label>
        <SubmitButton
          handleClick={() => void handleClick()}
          processing={processing}
        />
      </div>
    </section>
  );
};

export default InputSection;
