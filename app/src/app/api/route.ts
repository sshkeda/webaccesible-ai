import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type {
  ChatCompletionMessage,
  ChatCompletionTool,
} from "openai/resources/index.mjs";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(request: Request) {
  const body = await request.json();

  const messages = [
    {
      role: "system",
      content:
        "You are Al, a helpful assistant for users of the WebAccessible.ai Extension. Your job is to help users find accessibility issues on websites and fix them. Ultimately, you want to help make the web more accessible for everyone.",
    },
    ...body.messages,
  ] satisfies ChatCompletionMessage[];

  const tools = [
    {
      type: "function",
      function: {
        name: "run_accessibility_test",
        description: "Run an axe-core accessibility test on the current page. Only call when the user specifically requests for an accessibility test.",
      },
    },
  ] satisfies ChatCompletionTool[];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    messages,
    tools,
    tool_choice: "auto",
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
