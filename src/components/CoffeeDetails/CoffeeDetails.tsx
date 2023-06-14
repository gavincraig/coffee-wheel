import React from "react";
import { Coffee } from "../../types";

type CoffeeDetailsProps = {
  coffee?: Coffee;
  isNewCoffee?: boolean;
  originInputValue?: string | never;
  processInputValue?: string | never;
  varietalInputValue?: string | never;
  handleInputChange: () => void;
};

const CoffeeDetails = ({
  coffee,
  isNewCoffee,
  originInputValue,
  setOriginInputValue,
  processInputValue,
  setProcessInputValue,
  varietalInputValue,
  setVarietalInputValue,
  handleInputChange
}: CoffeeDetailsProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <input
        value={coffee?.origin || originInputValue}
        placeholder="origin"
        onChange={(e) => handleInputChange(setOriginInputValue(e.target.value))}
        disabled={!isNewCoffee}
      />
      <input
        value={coffee?.process || processInputValue}
        placeholder="process"
        onChange={(e) => handleInputChange(setProcessInputValue(e.target.value))}
        disabled={!isNewCoffee}
      />
      <input
        value={coffee?.varietal || varietalInputValue}
        placeholder="varietal"
        onChange={(e) => handleInputChange(setVarietalInputValue(e.target.value))}
        disabled={!isNewCoffee}
      />
    </div>
  );
};

export default CoffeeDetails;
