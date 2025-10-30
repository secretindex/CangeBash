interface MessageProps {
  name: string;
  message: string;
  time: string;
}

const MessageList: React.FC<MessageProps> = ({ name, message, time }) => {
  return (
    <div
      className={
        "flex flex-col gap-1 w-full max-w-[320px] " +
        `${name === "atendente" && "self-end"}`
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
        className={`flex flex-col leading-1.5 p-3 border-gray-200 ${name === "cliente" ? "bg-gray-100" : "bg-cyan-100"} rounded-e-xl rounded-es-xl dark:bg-gray-700`}
      >
        <p className="text-sm font-normal text-gray-900 dark:text-white">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MessageList;
