import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  title: string;
  openButtonText: string;
  closeButtonText: string;
  children: React.ReactNode;
  description?: string;
  ctaButtons?: React.ReactNode;
  open: boolean;
  hideOpenButton?: boolean;
  toggleModal: () => void;
}

const Modal = (props: ModalProps) => {
  const {
    title,
    openButtonText,
    closeButtonText,
    description,
    ctaButtons,
    children,
    hideOpenButton,
    open,
    toggleModal
  } = props;
  return (
    <Dialog.Root modal open={open}>
      {
        !hideOpenButton && <Dialog.Trigger>{openButtonText}</Dialog.Trigger>
      }
      <Dialog.Overlay className="fixed bg-zinc-800 bg-opacity-60 backdrop-blur-sm w-screen h-screen top-0 left-0 grid place-items-center animate-fade-in">
        <Dialog.Content className="p-4 bg-zinc-900 rounded-lg shadow-lg m-4 w-full max-w-sm sm:max-w-md" onInteractOutside={toggleModal}>
          <Dialog.Title className="font-lg">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="font-light font-sm mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
          <div className="flex justify-between">
            <Dialog.Close onClick={toggleModal}>{closeButtonText}</Dialog.Close>
            {ctaButtons}
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default Modal;
