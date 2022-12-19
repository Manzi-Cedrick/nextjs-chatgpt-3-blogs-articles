const OpenAI = require('openai-api');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  const beforePrompt = ``;
  const afterPrompt = ``;
  const breakPoint = `\n\n'''\n\n`;

  let prompt1 = `generate an blog(with more than 4000 words) with a title, introduction, body, conclusion, blog intro  and blog outline about the topic: ${req.body.topic}`;
  let prompt = `${beforePrompt} ${breakPoint} ${req.body.topic} ${breakPoint} ${afterPrompt}`;

  const gptResponse = await openai.complete({
    engine: 'text-davinci-003',
    prompt: prompt1,
    maxTokens: 2800,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({
    text: `${gptResponse.data.choices[0].text}`,
    topic: `${prompt}`,
    model: gptResponse.data.choices[0].engine,
  });
};
