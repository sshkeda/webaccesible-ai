// Inspired by Chatbot UI and Next.js AI Chatbot
// @see https://github.com/vercel/ai-chatbot/blob/main/components/chat-message.tsx
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import type { Message } from "ai";
import { MemoizedReactMarkdown } from "./markdown";
import { cn } from "@/lib/utils";
import { Bot, User, AlertCircle } from "lucide-react";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Separator } from "./ui/separator";
import { any, object, parse, picklist } from "valibot";
import AxeReport from "./axe-report";
import AxeViolation from "./axe-violation";

const uiSchema = object({
  type: picklist(["axe-report", "axe-violation"]),
  data: any(),
});

export default function ChatMessage({ message }: { message: Message }) {
  if (message.content === "") {
    return null;
  }

  if (message.ui) {
    if (typeof message.ui !== "string") {
      throw new Error("message.ui has to be a string.");
    }

    const ui = parse(uiSchema, JSON.parse(message.ui));

    if (ui.type === "axe-report") {
      return <AxeReport results={ui.data} />;
    }

    if (ui.type === "axe-violation") {
      return <AxeViolation violation={ui.data} />;
    }
  }

  return (
    <>
      <div className="relative flex items-start">
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
        <div className="ml-4 flex-1 space-y-2 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
          <MemoizedReactMarkdown
            className="prose prose-zinc break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-muted-foreground underline"
                  >
                    {children}
                  </a>
                );
              },
              strong({ children }) {
                return (
                  <strong className="font-normal underline">{children}</strong>
                );
              },
              p({ children }) {
                return <p className="mb-2 text-base last:mb-0">{children}</p>;
              },
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
        </div>
      </div>
      <Separator className="my-4 last:hidden" />
    </>
  );
}
