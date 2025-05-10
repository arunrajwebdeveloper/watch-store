import { useEffect } from "react";
import { useImmer } from "use-immer";

type ModalState = {
  isOpen: boolean;
  actionFrom: string;
  info: null;
  autoClose: boolean;
};

export const useModal = () => {
  const initialState: ModalState = {
    isOpen: false,
    actionFrom: "",
    info: null,
    autoClose: false,
  };

  const [modal, setModal] = useImmer(initialState);

  useEffect(() => {
    if (modal?.autoClose) {
      const timeout = setTimeout(() => {
        closeModal();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [modal]);

  const openModal = ({ actionFrom = "", info = null, autoClose = false }) => {
    setModal((draft) => {
      draft = {
        isOpen: true,
        actionFrom,
        info,
        autoClose,
      };
      return draft;
    });
  };

  const closeModal = () => {
    setModal(initialState);
  };

  return {
    modal,
    openModal,
    closeModal,
  };
};
