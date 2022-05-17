export default function getSavedResults() {
  let savedResults = localStorage.getItem("results");

  if (savedResults) {
    return JSON.parse(savedResults);
  } else {
    localStorage.setItem("results", JSON.stringify([]));
  }

  return [];
}
