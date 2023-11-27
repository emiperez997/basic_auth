import { createContext, useContext, useState } from "react";

const MessageContext = createContext();

function useMessage() {
  const { message, showMessage, hideMessage } = useContext(MessageContext);

  return { message, showMessage, hideMessage };
}

function MessageProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (message) => {
    setMessage(message);
  };

  const hideMessage = () => {
    setMessage(null);
  };

  return (
    <MessageContext.Provider
      value={{
        message,
        showMessage,
        hideMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageProvider, useMessage };
