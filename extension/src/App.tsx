import ThemeToggle from "./components/theme-toggle";
import PromptForm from "./components/prompt-form";
import { useChat, type Message } from "@sshkeda/ai/react";
import { Separator } from "./components/ui/separator";
import ChatMessage from "./components/chat-message";
import InitialMessageSuggestions from "./components/initial-message-suggestions";
import { useEffect, useState } from "react";

export default function App() {
  const {
    input,
    setInput,
    isLoading: aiLoading,
    messages,
    append,
    setMessages,
  } = useChat();

  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(value: string) {
    console.log(value);
  }

  function addMessage(message: Message) {
    setMessages((messages) => [...messages, message]);
  }

  useEffect(() => {
    setIsLoading(aiLoading);
  }, [aiLoading]);

  async function generateReport() {
    setIsLoading(true);
    try {
      addMessage({
        id: `report_${messages.length}`,
        role: "system",
        content: "Generating report...",
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
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "generateReport",
      });

      if (!response) {
        addMessage({
          id: `error_${messages.length}`,
          role: "system",
          content: "No response from content script. Try reloading the page.",
        });
        return;
      }

      addMessage({
        id: `report_${messages.length}`,
        role: "system",
        content: JSON.stringify(response, null, 2),
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
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </main>
  );
}
