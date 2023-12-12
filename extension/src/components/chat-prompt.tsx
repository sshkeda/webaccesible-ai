import * as React from "react";
import Textarea from "react-textarea-autosize";
import { type UseChatHelpers } from "ai/react";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CornerDownLeft, Plus } from "lucide-react";

export interface ChatPromptProps
  extends Pick<UseChatHelpers, "input" | "setInput"> {
  handleSubmit: UseChatHelpers["handleSubmit"];
  setMessages: UseChatHelpers["setMessages"];
  handleInputChange: UseChatHelpers["handleInputChange"];
  stop: UseChatHelpers["stop"];
  isLoading: boolean;
}

export default function ChatPrompt({
  handleSubmit,
  input,
  setInput,
  isLoading,
  setMessages,
  handleInputChange,
  stop,
}: ChatPromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.preventDefault();
                stop();
                setMessages([]);
                setInput("");
              }}
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4",
              )}
            >
              <Plus />
              <span className="sr-only">New Chat</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={handleInputChange}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] text-base scrollbar-thin  scrollbar-thumb-slate-200 focus-within:outline-none  dark:scrollbar-thumb-slate-800 "
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8"
                disabled={isLoading || input === ""}
              >
                <CornerDownLeft className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  );
}
