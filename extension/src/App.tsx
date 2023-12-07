import ThemeToggle from "./components/theme-toggle";
import PromptForm from "./components/prompt-form";
import { useChat, type Message } from "@sshkeda/ai/react";
import { Separator } from "./components/ui/separator";
import ChatMessage from "./components/chat-message";
import InitialMessageSuggestions from "./components/initial-message-suggestions";
import { useEffect, useState } from "react";
import type axe from "axe-core";
import { array, object, parse, string } from "valibot";

export default function App() {
  const {
    input,
    setInput,
    isLoading: aiLoading,
    messages,
    append,
    setMessages,
    handleSubmit,
    handleInputChange,
    stop,
  } = useChat({
    api: "http://localhost:3000/api",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(aiLoading);
  }, [aiLoading]);

  function addMessage(message: Message) {
    setMessages((messages) => [...messages, message]);
  }

  async function generateReport() {
    setIsLoading(true);
    try {
      addMessage({
        id: `report_${messages.length}`,
        role: "user",
        content: "Generate an accessibility report.",
      });

      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });

      if (!tab || !tab.id) {
        addMessage({
          id: `error_${messages.length}`,
          role: "system",
          content: "No tab found. Try reloading the page.",
        });
        return;
      }

      const results: axe.AxeResults = await chrome.tabs.sendMessage(tab.id, {
        action: "generateReport",
      });

      console.log(results);

      if (!results) {
        addMessage({
          id: `error_${messages.length}`,
          role: "system",
          content: "No response from content script. Try reloading the page.",
        });
        return;
      }
      console.log(results);

      const schema = array(
        object({
          description: string(),
          help: string(),
          helpUrl: string(),
          id: string(),
          impact: string(),
        }),
      );

      const violations = parse(schema, results.violations);

      addMessage({
        id: `report_${messages.length}`,
        role: "assistant",
        content: "```json\n" + JSON.stringify(violations, null, 2) + "\n```",
      });
    } catch (error) {
      if (error instanceof Error) {
        addMessage({
          id: `error_${messages.length}`,
          role: "system",
          content: error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

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
        {messages.length === 0 && (
          <InitialMessageSuggestions
            append={append}
            generateReport={generateReport}
          />
        )}
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full">
        <div className="mt-4 border-t px-4">
          <PromptForm
            input={input}
            setInput={setInput}
            isLoading={isLoading}
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
