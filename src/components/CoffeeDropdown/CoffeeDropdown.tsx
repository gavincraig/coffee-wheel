import React from "react";
import { MOCK_COFFEE } from "../../constants";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { Coffee } from "../../types";
import { NewCoffeeModal } from "../NewCoffeeModal";

type Props = {
  options: Coffee[] | never;
  open: boolean;
  selectedCoffee: Coffee | never;
  handleSelectCoffee: () => void;
  toggleDropdown: () => void;
  handleSaveNewCoffee: (newCoffee: Coffee) => void;
};

const CoffeeDropdown = ({
  options,
  open,
  toggleDropdown,
  selectedCoffee,
  handleSelectCoffee,
  toggleNewCoffeeModal,
  handleSaveNewCoffee,
}: Props) => {

    const handleToggleNewCoffeeModal = () => {
        toggleDropdown();
        toggleNewCoffeeModal();
    }

    const handleClickItem = (coffee: Coffee) => {
        toggleDropdown();
        handleSelectCoffee(coffee);
    }

  return (
    <>
      <DropdownMenu.Root open={open}>
        <DropdownMenu.Trigger className="flex items-center gap-2" onClick={toggleDropdown}>
          {selectedCoffee?.name || "select"}
          <ChevronDownIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-zinc-900 rounded-lg shadow-lg flex flex-col gap-2 overflow-hidden" onInteractOutside={toggleDropdown}>
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
          <button onClick={() => handleToggleNewCoffeeModal()}>
            New Coffee
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

export default CoffeeDropdown;
