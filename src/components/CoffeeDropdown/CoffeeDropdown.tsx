import React from 'react'
import { MOCK_COFFEE } from '../../constants'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from '@radix-ui/react-icons';
import { Coffee } from '../../types';


type Props = {
    options: Coffee[] | never;
    selectedCoffee: Coffee | never;
    handleSelectCoffee: ()=> void;
    handleAddNewCoffee: () => void;
}

const CoffeeDropdown = ({ options, selectedCoffee, handleSelectCoffee, handleAddNewCoffee }) => {
  return (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger className='flex items-center gap-2'>
            {selectedCoffee?.name || 'select'}
            <ChevronDownIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='bg-slate-800 p-4 shadow-xl flex flex-col'>
            {
                options?.length > 0 ? options.map(coffee => {
                    return (
                        <DropdownMenu.Item onSelect={() => handleSelectCoffee(coffee)}>
                            { coffee.name }
                        </DropdownMenu.Item>
                    )
                })
                : <span>No coffees</span>
            }
            <button onClick={handleAddNewCoffee}>New Coffee</button>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default CoffeeDropdown