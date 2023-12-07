// Inspired by Chatbot UI and Next.js AI Chatbot
// @see https://github.com/vercel/ai-chatbot/blob/main/components/chat-message.tsx
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import { MemoizedReactMarkdown } from "./markdown";
import { cn } from "@/lib/utils";
import { Bot, User, AlertCircle } from "lucide-react";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className="relative mb-4 flex items-start">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user"
            ? "bg-background"
            : "bg-primary text-primary-foreground",
        )}
      >
        {message.role === "user" ? (
          <User />
        ) : message.role === "system" ? (
          <AlertCircle />
        ) : (
          <Bot />
        )}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 text-base last:mb-0">{children}</p>;
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}
