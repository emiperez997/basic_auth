import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

function useModal() {
  const modal = useContext(ModalContext);

  return modal;
}

function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = (modal) => setModal(modal);

  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export { ModalProvider, useModal };
