import { useMessage } from "../hooks/useMessage";

function Message() {
  const { message, hideMessage } = useMessage();

  const bg = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500",
  };

  const handleHideMessage = () => {
    hideMessage();
  };

  return (
    <div
      className={`${
        bg[message.type]
      } py-5 w-full px-5 text-center flex flex-row justify-between items-center rounded-lg`}
    >
      <h2 className="font-bold text-xl">{message.text}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
        onClick={handleHideMessage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}

export { Message };
