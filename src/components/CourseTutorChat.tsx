import React, { useEffect, useMemo, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart, type UIMessage } from "ai";
import { AlertCircle, BookOpen, ExternalLink, GraduationCap, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "learn-any-course-gpt-chat";
const CHATGPT_VERSION_URL = "https://chatgpt.com/g/g-6730d59e8e648190be4221e319aad5cd-learn-any-course-gpt";

const welcomeMessage: UIMessage = {
  id: "learn-any-course-welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hey 🤗 I can teach you any course you want for free! Shall We Begin?",
      state: "done",
    },
  ],
};

const suggestionPrompts = [
  "Teach me World History from beginner to expert",
  "Create a complete Python course for beginners",
  "Help me learn business marketing step-by-step",
];

function loadStoredMessages(): UIMessage[] {
  if (typeof window === "undefined") {
    return [welcomeMessage];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [welcomeMessage];
    }

    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as UIMessage[];
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return [welcomeMessage];
}

function textFromMessage(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("\n");
}

function youtubeIdsFromText(text: string): string[] {
  const ids = new Set<string>();
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/g,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/g,
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const id = match[1];
      if (id) {
        ids.add(id);
      }
    }
  }

  return [...ids].slice(0, 6);
}

function isCreditLimitError(error: Error | undefined): boolean {
  if (!error?.message) {
    return false;
  }

  const message = error.message.toLowerCase();
  return message.includes("402") || message.includes("credit") || message.includes("credits") || message.includes("insufficient");
}

function YouTubeEmbeds({ text }: { text: string }) {
  const ids = youtubeIdsFromText(text);
  if (ids.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {ids.map((id) => (
        <div key={id} className="overflow-hidden rounded-xl border border-border bg-card/80 shadow-lg">
          <div className="aspect-video w-full bg-muted">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${id}`}
              title="Course lesson video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <a
            className="block px-3 py-2 text-xs font-medium text-primary hover:underline"
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noreferrer"
          >
            Open video on YouTube
          </a>
        </div>
      ))}
    </div>
  );
}

function ToolPartView({ part }: { part: Extract<UIMessage["parts"][number], { type: string }> }) {
  if (!isToolUIPart(part)) {
    return null;
  }

  const toolTitle = part.type === "dynamic-tool"
    ? part.toolName
    : part.type.replace(/^tool-/, "").replaceAll("_", " ");

  return (
    <Tool defaultOpen={false} className="border-primary/20 bg-card/70">
      <ToolHeader
        type={part.type as never}
        state={part.state}
        toolName={part.type === "dynamic-tool" ? part.toolName : undefined as never}
        title={toolTitle}
      />
      <ToolContent>
        <ToolInput input={part.input} />
        <ToolOutput output={part.output} errorText={part.errorText} />
      </ToolContent>
    </Tool>
  );
}

function CourseMessage({ message }: { message: UIMessage }) {
  const text = textFromMessage(message);
  const reasoning = message.parts
    .filter((part) => part.type === "reasoning")
    .map((part) => part.text)
    .join("\n");

  return (
    <Message from={message.role} className="max-w-full">
      <div className={cn("flex gap-3", message.role === "user" && "justify-end")}>
        {message.role === "assistant" && (
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary shadow-lg">
            <BookOpen className="h-4 w-4" />
          </div>
        )}
        <div className={cn("min-w-0 flex-1", message.role === "user" && "flex justify-end")}>
          {reasoning && message.role === "assistant" && (
            <div className="mb-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Tutor planning:</span> {reasoning}
            </div>
          )}

          {text && (
            <MessageContent
              className={cn(
                "text-base leading-7",
                message.role === "assistant" && "w-full max-w-none",
                message.role === "user" && "max-w-[min(34rem,100%)] bg-primary text-primary-foreground"
              )}
            >
              <MessageResponse>{text}</MessageResponse>
              {message.role === "assistant" && <YouTubeEmbeds text={text} />}
            </MessageContent>
          )}

          {message.parts.map((part, index) => (
            isToolUIPart(part) ? <ToolPartView key={`${message.id}-tool-${index}`} part={part} /> : null
          ))}
        </div>
      </div>
    </Message>
  );
}

export default function CourseTutorChat() {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const initialMessages = useMemo(loadStoredMessages, []);
  const transport = useMemo(() => new DefaultChatTransport({
    api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/course-tutor`,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
  }), []);

  const {
    messages,
    sendMessage,
    status,
    stop,
    error,
    setMessages,
    clearError,
  } = useChat({
    id: "learn-any-course-gpt",
    messages: initialMessages,
    transport,
    onError: (chatError) => {
      toast.error(chatError.message || "The course tutor could not respond.");
    },
    onFinish: () => {
      inputRef.current?.focus();
    },
  });

  const isLoading = status === "submitted" || status === "streaming";
  const showCreditFallback = isCreditLimitError(error);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const resetCourse = () => {
    setMessages([welcomeMessage]);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMessage]));
    clearError();
    inputRef.current?.focus();
  };

  const submitText = async (text: string) => {
    const value = text.trim();
    if (!value || isLoading) {
      return;
    }

    await sendMessage({ text: value });
    inputRef.current?.focus();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-card/80 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 starry-background opacity-20" aria-hidden="true" />
      <div className="relative z-10 flex min-h-[680px] flex-col">
        <div className="flex flex-col gap-4 border-b border-border bg-background/80 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-primary shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">In-site AI tutor</p>
              <h3 className="text-lg font-bold text-foreground">Learn Any Course GPT</h3>
            </div>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={resetCourse} className="self-start sm:self-auto">
            <RotateCcw className="h-4 w-4" />
            New course
          </Button>
        </div>

        <Conversation className="min-h-0 flex-1">
          <ConversationContent className="gap-6 p-4 sm:p-6">
            {messages.map((message) => (
              <CourseMessage key={message.id} message={message} />
            ))}
            {status === "submitted" && (
              <div className="flex items-center gap-3 px-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <Shimmer>Preparing your lesson...</Shimmer>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {error && (
          <div className="mx-4 mb-3 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive sm:mx-6">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error.message || "The course tutor could not respond. Please try again."}</span>
          </div>
        )}

        {showCreditFallback && (
          <div className="mx-4 mb-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground sm:mx-6">
            <p className="font-semibold">Sorry, community credits have run out for today.</p>
            <p className="mt-1 text-muted-foreground">Please try the Learn Any Course GPT (CHATGPT version) while the in-site version resets.</p>
            <Button type="button" size="sm" className="mt-3 rounded-full" asChild>
              <a href={CHATGPT_VERSION_URL} target="_blank" rel="noopener noreferrer">
                Open Learn Any Course GPT (CHATGPT version)
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        )}

        {messages.length <= 1 && (
          <div className="grid gap-2 border-t border-border bg-background/50 p-4 sm:grid-cols-3 sm:px-6">
            {suggestionPrompts.map((prompt) => (
              <Button
                key={prompt}
                type="button"
                variant="secondary"
                className="h-auto justify-start whitespace-normal rounded-xl px-4 py-3 text-left text-sm"
                onClick={() => submitText(prompt)}
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}

        <div className="border-t border-border bg-background/80 p-4 sm:p-6">
          <PromptInput
            onSubmit={({ text }) => submitText(text)}
            className="rounded-xl border-primary/20 bg-background/80 shadow-lg"
          >
            <PromptInputTextarea
              ref={inputRef}
              placeholder="What course or degree would you like to learn?"
              className="min-h-20 text-base"
              disabled={isLoading}
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit
                status={status}
                onStop={stop}
                disabled={isLoading && status !== "streaming"}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
