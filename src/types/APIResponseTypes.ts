export interface OpenAIAPIResponse {
  data: {
    choices: [
      { text: string; index: number; logprobs: null; finish_reason: string }
    ];
    created: number;
    id: string;
    object: string;
    model: string;
  };
}
