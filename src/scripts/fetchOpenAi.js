const axios = require("axios");
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export const generateResponse = async (prompt, engine) => {
  const options = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const url = "https://api.openai.com/v1/engines/" + engine + "/completions";

  const header = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + REACT_APP_API_KEY,
  };
  return axios
    .post(url, options, {
      headers: header,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
