import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Coffee } from "../../types";

type CoffeeDropdownProps = {
  open: boolean;
  options: Coffee[] | never;
  selectedCoffee: Coffee | never;
  toggleOpen: () => void;
  toggleNewCoffeeModal: () => void;
  handleSelectCoffee: (coffee: Coffee) => void;
};

const CoffeeDropdown = (props: CoffeeDropdownProps) => {
  const {
    open,
    options,
    selectedCoffee,
    toggleOpen,
    toggleNewCoffeeModal,
    handleSelectCoffee,
  } = props;

  const handleToggleNewCoffeeModal = () => {
    toggleOpen();
    toggleNewCoffeeModal();
  };

  const handleClickItem = (coffee: Coffee) => {
    toggleOpen();
    handleSelectCoffee(coffee);
  };

  return (
    <DropdownMenu.Root open={open}>
      <DropdownMenu.Trigger
        className="flex items-center gap-2"
        onClick={toggleOpen}
      >
        {selectedCoffee?.name || "select"}
        <ChevronDownIcon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-zinc-900 rounded-lg shadow-lg flex flex-col gap-2 overflow-hidden"
        onInteractOutside={toggleOpen}
      >
        {options?.length > 0 ? (
          options.map((coffee) => {
            return (
              <DropdownMenu.Item
                className="px-4 py-2 cursor-pointer hover:bg-zinc-800"
                onSelect={() => handleClickItem(coffee)}
              >
                {coffee.name}
              </DropdownMenu.Item>
            );
          })
        ) : (
          <span>No coffees</span>
        )}
        <button onClick={handleToggleNewCoffeeModal}>New Coffee</button>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default CoffeeDropdown;
