import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <StrictMode>
      <MainPage />
    </StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
