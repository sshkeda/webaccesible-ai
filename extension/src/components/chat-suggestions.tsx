import { Button } from "./ui/button";
import { nanoid } from "ai";
import type { UseChatHelpers } from "ai/react";

export default function ChatSuggestions({
  append,
}: {
  append: UseChatHelpers["append"];
}) {
  return (
    <div className="absolute -top-[88px] flex w-full flex-wrap justify-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          append({
            id: nanoid(),
            role: "user",
            content: "What can you do?",
          });
        }}
      >
        What can you do?
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          append({
            id: nanoid(),
            role: "user",
            content: "Run an accessibility test",
          });
        }}
      >
        {/* 6.82 px to make both rows the same width */}
        Run an accessibility test<span className="w-[6.82px]"></span>⚡
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          append({
            id: nanoid(),
            role: "user",
            content: "What is WebAccessible.ai?",
          });
        }}
      >
        What is WebAccessible<span className="italic">.ai</span>?
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          append({
            id: nanoid(),
            role: "user",
            content: "How can I support?",
          });
        }}
      >
        How can I support?
      </Button>
    </div>
  );
}
