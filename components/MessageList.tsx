"use client";

import ReactMarkdown from "react-markdown";

interface MessageProps {
  name: string;
  message: string;
  messageId: string;
  time: string;
  isAtendente: boolean;
  isBot: boolean;
  mediaUrl?: string;
}

const MessageList: React.FC<MessageProps> = ({
  name,
  message,
  messageId,
  time,
  isAtendente,
  isBot,
  mediaUrl,
}) => {
  return (
    <div
      className={
        "flex flex-col gap-1 w-full max-w-[320px] " +
        `${isAtendente && !isBot ? "self-end" : "self-start"}`
      }
    >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span
          className={`text-sm font-semibold ${isBot ? "text-primary" : "text-foreground"}`}
        >
          {isBot ? "ChatBot" : name}
        </span>
        <span className="text-xs font-normal text-muted-foreground">
          {time}
        </span>
      </div>
      <div
        className={`flex flex-col leading-1.5 p-3 border-border ${!isAtendente ? "bg-muted" : "bg-primary/10"} markdown-body rounded-e-xl rounded-es-xl prose prose-sm max-w-none leading-relaxed break-words`}
      >
        <ReactMarkdown>{message as string}</ReactMarkdown>
        {mediaUrl && <img src={mediaUrl} alt="" className="w-full h-full" />}
      </div>
      
    </div>
  );
};

export default MessageList;
