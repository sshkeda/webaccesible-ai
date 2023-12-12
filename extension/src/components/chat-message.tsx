// Inspired by Chatbot UI and Next.js AI Chatbot
// @see https://github.com/vercel/ai-chatbot/blob/main/components/chat-message.tsx
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import { MemoizedReactMarkdown } from "./markdown";
import { cn } from "@/lib/utils";
import { Bot, User, AlertCircle } from "lucide-react";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import ViolationMessage from "./violation-message";

export default function ChatMessage({ message }: { message: Message }) {
  if (message.id.startsWith("report_violation")) {
    return <ViolationMessage violation={JSON.parse(message.content)} />;
  }
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
      <div className="ml-4 flex-1 space-y-2 overflow-x-auto overflow-y-hidden px-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
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
