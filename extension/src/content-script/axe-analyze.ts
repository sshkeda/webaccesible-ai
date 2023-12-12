import axe from "axe-core";
import { object, parse, string, any } from "valibot";

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  handleRequest(request).then(sendResponse);
  return true;
});

const schema = object({
  action: string(),
  data: any(),
});
async function handleRequest(request: unknown) {
  const { action, data } = parse(schema, request);

  const { options } = data;

  if (action === "generateReport") {
    const results = await axe.run(options);
    return results;
  }
}
