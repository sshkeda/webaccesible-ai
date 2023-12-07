import axe from "axe-core";
import { object, parse, string } from "valibot";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  handleRequest(request).then(sendResponse);
  return true;
});

const schema = object({
  action: string(),
});
async function handleRequest(request: unknown) {
  const { action } = parse(schema, request);

  if (action === "generateReport") {
    const results = await axe.run();
    return results;
  }
}
