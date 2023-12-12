import ThemeToggle from "./components/theme-toggle";
import ChatPrompt from "./components/chat-prompt";
import { useChat } from "@sshkeda/ai/react";
import { useEffect } from "react";
import type axe from "axe-core";
import { useSetAtom } from "jotai";
import ChatList from "./components/chat-list";
import { errorAtom } from "./lib/atoms";
import { Message } from "ai";

const TAGS = ["wcag21aa", "best-practice"];

export interface Report {
  axeResults: axe.AxeResults;
  tab: chrome.tabs.Tab;
}

export default function App() {
  const {
    input,
    setInput,
    isLoading: aiLoading,
    messages,
    setMessages,
    handleSubmit,
    handleInputChange,
    stop,
  } = useChat({
    api: "http://localhost:3000/api",
  });

  const setError = useSetAtom(errorAtom);

  useEffect(() => {
    async function generateReport() {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        const results: axe.AxeResults = await chrome.tabs.sendMessage(tab.id!, {
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

        if (!results) {
          throw new Error("No response from content script.");
        }

        console.log(results);

        setMessages((messages) => [
          ...messages,
          {
            id: `report_summary_${results.timestamp}`,
            role: "assistant",
            content: `An axe-core accessibility test was ran on **${
              tab.url
            }** and found ${results.violations.length} violation${
              results.violations.length != 0 && "s"
            }.`,
          },
          ...results.violations.map((violation) => {
            const { description, helpUrl, id, impact } = violation;

            return {
              id: `report_violation_${violation.id}`,
              role: "assistant",
              content: JSON.stringify({
                description,
                helpUrl,
                id,
                impact,
              }),
            } satisfies Message;
          }),
        ]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
    }

    generateReport();
  }, [setError, setMessages]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <main>
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">waccessible.ai Extension</h1>
        <ThemeToggle />
      </div>
      <div className="mt-4 px-4 pb-[66px]">
        <ChatList messages={messages} />
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full">
        <div className="mt-4 border-t px-4">
          <ChatPrompt
            input={input}
            setInput={setInput}
            isLoading={aiLoading}
            handleSubmit={handleSubmit}
            setMessages={setMessages}
            handleInputChange={handleInputChange}
            stop={stop}
          />
        </div>
      </div>
    </main>
  );
}
