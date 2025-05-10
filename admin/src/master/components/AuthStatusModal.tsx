import { Modal, ModalBody } from "reactstrap";

type ModalState = {
  isOpen?: boolean;
  content: any;
  onCancel: any;
  centered?: boolean;
  size?: string;
};

export const AuthStatusModal = ({
  isOpen = false,
  content,
  onCancel,
  centered = false,
  size = "md",
}: ModalState) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel} centered={centered} size={size}>
      <ModalBody>
        <h3>{content}</h3>
      </ModalBody>
    </Modal>
  );
};
