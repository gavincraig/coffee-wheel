import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  title: string;
  openButtonText: string;
  closeButtonText: string;
  children: React.ReactNode;
  description?: string;
  ctaButtons?: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const {
    title,
    openButtonText,
    closeButtonText,
    description,
    ctaButtons,
    children,
  } = props;
  return (
    <Dialog.Root modal>
      <Dialog.Trigger>{openButtonText}</Dialog.Trigger>
      <Dialog.Overlay className="fixed bg-zinc-800 bg-opacity-60 backdrop-blur-sm w-full h-full top-0 let-0 grid place-items-center animate-fade-in">
        <Dialog.Content className="p-4 bg-zinc-900 rounded-lg shadow-lg m-4 w-full max-w-sm sm:max-w-md">
          <Dialog.Title className="font-lg">{title}</Dialog.Title>
          {description && (
            <Dialog.Description className="font-light font-sm mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
          <div className="flex justify-between">
          <Dialog.Close>{closeButtonText}</Dialog.Close>
            {ctaButtons}
            </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default Modal;
