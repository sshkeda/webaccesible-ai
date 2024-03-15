import {
  nanoid,
  type ChatRequest,
  type ToolCallHandler,
  type Message,
} from "ai";
import { generateAxeResults } from "./axe";
import { p } from "./utils";

export const INITIAL_MESSAGE = {
  id: nanoid(),
  role: "assistant",
  content:
    "Hi! I'm Al, your personal AI web accessibility assistant. My goal is to help increase web accessibility.",
} satisfies Message;

export const toolCallHandler: ToolCallHandler = async (
  chatMessages,
  toolCalls,
) => {
  let handledFunction = false;

  for (const toolCall of toolCalls) {
    if (toolCall.function.name === "run_accessibility_test") {
      handledFunction = true;

      const results = await generateAxeResults();

      chatMessages.push({
        id: nanoid(),
        tool_call_id: toolCall.id,
        name: toolCall.function.name,
        role: "tool" as const,
        ui: JSON.stringify({
          type: "axe-report",
          data: results,
        }),
        content: `An accessibility test on ${results.url} has been completed and found ${results.violations.length} violation${p(results.violations.length)}. Do you have any questions?`,
      });

      results.violations.forEach((violation) => {
        const { description, helpUrl, id, impact } = violation;

        chatMessages.push({
          id: nanoid(),
          role: "assistant",
          ui: JSON.stringify({
            type: "axe-violation",
            data: violation,
          }),
          content: JSON.stringify({
            description,
            helpUrl,
            id,
            impact,
          }),
        });
      });
    }
  }

  if (handledFunction) {
    const toolResponse: ChatRequest = { messages: chatMessages };
    return toolResponse;
  }
};
