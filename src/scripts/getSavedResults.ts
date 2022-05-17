interface Results {
  prompt: string;
  response: string;
}

export default function getSavedResults(): Array<Results> {
  const savedResults = localStorage.getItem("results");

  if (savedResults) {
    return JSON.parse(savedResults) as Array<Results>;
  } else {
    localStorage.setItem("results", JSON.stringify([]));
  }

  return [];
}
