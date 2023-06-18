import React from "react";
import { Coffee } from "../../types";

type CoffeeDetailsProps = {
  coffee?: Coffee;
  isNewCoffee?: boolean;
  coffeeNameInputValue?: string | never;
  setCoffeeNameInputValue: React.Dispatch<React.SetStateAction<string>>;
  originInputValue?: string | never;
  setOriginInputValue: React.Dispatch<React.SetStateAction<string>>;
  processInputValue?: string | never;
  setProcessInputValue: React.Dispatch<React.SetStateAction<string>>;
  varietalInputValue?: string | never;
  setVarietalInputValue: React.Dispatch<React.SetStateAction<string>>;
};

const CoffeeDetails = ({
  coffee,
  isNewCoffee,
  originInputValue,
  setOriginInputValue,
  processInputValue,
  setProcessInputValue,
  varietalInputValue,
  setVarietalInputValue
}: CoffeeDetailsProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <input
        value={coffee?.origin || originInputValue}
        placeholder="origin"
        onChange={(e) => (setOriginInputValue(e.target.value))}
        disabled={!isNewCoffee}
      />
      <input
        value={coffee?.process || processInputValue}
        placeholder="process"
        onChange={(e) => setProcessInputValue(e.target.value)}
        disabled={!isNewCoffee}
      />
      <input
        value={coffee?.varietal || varietalInputValue}
        placeholder="varietal"
        onChange={(e) => (setVarietalInputValue(e.target.value))}
        disabled={!isNewCoffee}
      />
    </div>
  );
};

export default CoffeeDetails;
