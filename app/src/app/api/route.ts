// import type { ChatCompletionCreateParams } from "openai/resources/chat/index";
// import OpenAI from "openai";

// const openai = new OpenAI();

// const functions: ChatCompletionCreateParams.Function[] = [
//   {
//     name: "get_current_weather",
//     description: "Get the current weather",
//     parameters: {
//       type: "string",
//       properties: {
//         location: {
//           type: "string",
//           description: "The city and state, e.g. San Francisco, CA",
//         },
//       },
//       required: ["action", "format"],
//     },
//   },
// ];

export async function POST(request: Request) {
  const body = await request.json();

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo-0613",
  //   stream: true,
  //   messages,
  //   functions,
  // });

  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);
}
