import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatPrompt from "./components/chat-prompt";
import { useChat } from "ai/react";
import { INITIAL_MESSAGE } from "@/lib/ai.ts";
import ChatMessage from "./components/chat-message";
import { toolCallHandler } from "./lib/ai.ts";
import { useEffect, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { errorAtom } from "./lib/atoms.ts";
import { testPageConnection, testServerConnection } from "./lib/utils.ts";
import { Button } from "./components/ui/button.tsx";
import { Settings } from "lucide-react";
import ThemeToggle from "./components/theme-toggle.tsx";
import ChatSuggestions from "./components/chat-suggestions.tsx";

export default function Home() {
  const {
    input,
    setInput,
    isLoading: aiLoading,
    messages,
    setMessages,
    handleSubmit,
    handleInputChange,
    append,
    stop,
  } = useChat({
    api: "http://localhost:3000/api",
    experimental_onToolCall: toolCallHandler,
    initialMessages: [INITIAL_MESSAGE],
  });

  const setError = useSetAtom(errorAtom);
  const [tabId, setTabId] = useState<string | null>(null);
  const messagesLoaded = useRef(false);

  useEffect(() => {
    testPageConnection()
      .then((tabId) => setTabId(tabId.toString()))
      .catch(setError);
    testServerConnection().catch(setError);
  }, [setError]);

  useEffect(() => {
    if (tabId && !messagesLoaded.current) {
      chrome.storage.session.get([tabId], (result) => {
        const rawMessages = result[tabId];
        if (rawMessages) {
          setMessages(JSON.parse(rawMessages));
          messagesLoaded.current = true;
        }
      });
    }
  }, [tabId, setMessages]);

  useEffect(() => {
    if (tabId) {
      chrome.storage.session.set({
        [tabId]: JSON.stringify(messages),
      });
    }
  }, [messages, tabId]);

  return (
    <main className="flex h-[600px] flex-col justify-between">
      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700">
        <Header />
        <div className="space-y-4 p-4">
          {messages.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </div>
      </div>
      <div className="relative w-full">
        {messages.length === 1 && <ChatSuggestions append={append} />}
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
    </main>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between border-b p-[13px]">
      <h1 className="text-xl">
        WebAccessible<span className="italic">.ai</span> Extension
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-[13px]">
          <ThemeToggle />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
