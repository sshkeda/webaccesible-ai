import axe from "axe-core";
import { object, parse, string, any, optional } from "valibot";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  handleRequest(request).then(sendResponse);
  return true;
});

const schema = object({
  action: string(),
  data: optional(any()),
});

async function handleRequest(request: unknown) {
  const { action, data } = parse(schema, request);

  if (action === "ping") {
    return "pong";
  }

  if (action === "generateReport") {
    const { options } = data;

    const results = await axe.run(options);
    return results;
  }
}
