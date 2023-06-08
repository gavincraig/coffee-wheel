import React from 'react'
import { Coffee } from '../../types'

type CoffeeDetailsProps = {
    coffee?: Coffee;
}

const CoffeeDetails = ({ coffee } : CoffeeDetailsProps) => {

    const isEditable = !!coffee;

  return (
    <div className="flex flex-col gap-2 p-4">
        <input value={coffee?.origin} placeholder='origin' disabled={isEditable} />
        <input value={coffee?.process} placeholder='process' disabled={isEditable}/>
        <input value={coffee?.varietal} placeholder='varietal' disabled={isEditable}/>
    </div>
  )
}

export default CoffeeDetails