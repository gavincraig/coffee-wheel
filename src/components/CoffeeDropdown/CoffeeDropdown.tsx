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
    selectedCoffee: Coffee | never
}

const CoffeeDropdown = ({ selectedCoffee, handleSelectCoffee }) => {
  return (
    <DropdownMenu.Root>
        <DropdownMenu.Trigger className='flex items-center gap-2'>
            {
                selectedCoffee ? <span>{selectedCoffee.name}</span> : <span>select</span>
            }
            <ChevronDownIcon />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className='bg-slate-800 p-4'>
            {
                MOCK_COFFEE.map(coffee => {
                    return (
                        <DropdownMenu.Item onSelect={() => handleSelectCoffee(coffee)}>
                            { coffee.name }
                        </DropdownMenu.Item>
                    )
                })
            }
            <button>add new</button>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default CoffeeDropdown