import axe from "axe-core";

const TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag2aaa",
  "wcag21a",
  "wcag21aa",
  "best-practice",
];

export async function generateAxeResults() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) {
    throw new Error("No active tab found.");
  }

  const results: axe.AxeResults = await chrome.tabs.sendMessage(tab.id, {
    action: "generateReport",
    data: {
      options: {
        runOnly: {
          type: "tag",
          values: TAGS,
        },
      },
    },
  });

  console.log(results);

  if (!results) {
    throw new Error("No response from content script.");
  }

  return results;
}
