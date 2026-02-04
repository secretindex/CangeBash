import ReactMarkdown from "react-markdown";

interface MessageProps {
  name: string;
  message: string;
  time: string;
  isAtendente: boolean;
  mediaUrl?: string;
}

const MessageList: React.FC<MessageProps> = ({ name, message, time, isAtendente, mediaUrl }) => {
  return (
    <div
      className={
        "flex flex-col gap-1 w-full max-w-[320px] " +
        `${isAtendente && "self-end"}`
      }
    >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </span>
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          {time}
        </span>
      </div>
      <div
        className={`flex flex-col leading-1.5 p-3 border-gray-200 ${!isAtendente ? "bg-gray-100" : "bg-indigo-100"} markdown-body rounded-e-xl rounded-es-xl dark:bg-gray-700 prose prose-sm max-w-none leading-relaxed break-words`}
      >
        <ReactMarkdown >
          {message as string}
        </ReactMarkdown>
        {mediaUrl && (
          <img src={mediaUrl} alt="" className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default MessageList;
