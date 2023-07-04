import * as Dialog from "@radix-ui/react-dialog";
import { Pencil2Icon } from "@radix-ui/react-icons";

type Props = {
  commentsInputValue;
  setCommentsInputValue;
};

const TastingNotes = ({ commentsInputValue, setCommentsInputValue }: Props) => {
  return (
    <Dialog.Root modal>
      <Dialog.Trigger className="flex gap-2 items-center">
        <Pencil2Icon />
        Notes
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed bg-zinc-800 bg-opacity-60 backdrop-blur-sm w-screen h-screen top-0 left-0 grid place-items-center animate-fade-in">
        <Dialog.Content className="p-4 bg-zinc-900 rounded-lg shadow-lg m-4 w-full max-w-sm sm:max-w-md top-1/4 absolute">
          <Dialog.Title className="font-lg">Tasting Notes</Dialog.Title>
          <Dialog.Description className="font-light font-sm mb-4">
            Add some notes.
          </Dialog.Description>
          <textarea
            placeholder="notes"
            value={commentsInputValue}
            className="w-full p-2"
            onChange={(e) => setCommentsInputValue(e.target.value)}
          />
          <div className="flex justify-between">
            <Dialog.Close>Close</Dialog.Close>
            <Dialog.Close>Save</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default TastingNotes;
