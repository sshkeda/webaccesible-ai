import { ModeToggle } from "./components/mode-toggle";
import { PromptForm } from "./components/prompt-form";
import { useChat } from "ai/react";

export default function App() {
  const { input, setInput, isLoading } = useChat();

  function onSubmit(value: string) {
    console.log(value);
  }

  return (
    <>
      <main>
        <ModeToggle />
        <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </>
  );
}
