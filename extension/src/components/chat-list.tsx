import { Message } from "@sshkeda/ai/react";
import ChatMessage from "./chat-message";
import { Separator } from "@radix-ui/react-separator";

export default function ChatList({ messages }: { messages: Message[] }) {
  return messages.map((message, index) => {
    return (
      <div key={index}>
        <ChatMessage message={message} />
        {index < messages.length - 1 && <Separator className="my-4 md:my-8" />}
      </div>
    );
  });
}
