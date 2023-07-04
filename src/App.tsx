import { useState } from "react";
import { CoffeeDropdown } from "./components/CoffeeDropdown";
import FullBreadcrumb from "./components/FlavourBreadcrumb/FlavourBreadcrumb";
import { NewCoffeeModal } from "./components/NewCoffeeModal";
import { TastingNotes } from "./components/TastingNotes";
import { Wheel } from "./components/Wheel";
import { MOCK_COFFEE } from "./constants";
import { HistoryContext } from "./context/HistoryContext";
import { Coffee, FlavourBreadcrumbEntry, TastingHistoryEntry } from "./types";

export default function App() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | never>(null);
  const [flavourBreadcrumb, setFlavourBreadcrumb] = useState<
    FlavourBreadcrumbEntry[] | []
  >([]);
  const [selections, setSelections] = useState<string[] | []>([]);
  const [commentsInputValue, setCommentsInputValue] = useState("");
  const [coffeeOptions, setCoffeeOptions] = useState<Coffee[] | []>(
    MOCK_COFFEE
  );
  const [tastingHistory, setTastingHistory] = useState<TastingHistoryEntry[]>(
    []
  );

  const [showNewCoffeeModal, setShowNewCoffeeModal] = useState(false);
  const [showCoffeeDropdown, setShowCoffeeDropdown] = useState(false);

  const toggleNewCoffeeModal = () =>
    setShowNewCoffeeModal((showNewCoffeeModal) => !showNewCoffeeModal);

  const toggleCoffeeDropdown = () =>
    setShowCoffeeDropdown((showCoffeeDropdown) => !showCoffeeDropdown);

  const handleSelectCoffee = (coffee: Coffee) => setSelectedCoffee(coffee);

  const handleCancel = () => {
    handleResetSelections();
    setSelectedCoffee(null);
  };

  const handleResetSelections = () => {
    setSelections([]);
    setFlavourBreadcrumb([]);
  };

  const handleSaveNewCoffee = (newCoffee: Coffee) => {
    handleAddCoffeeToCoffeeList(newCoffee);
    handleSelectCoffee(newCoffee);
  };

  const handleAddCoffeeToCoffeeList = (newCoffee: Coffee) =>
    setCoffeeOptions([newCoffee, ...coffeeOptions]);

  const handleSave = () => {
    const newEntry = {
      coffee: selectedCoffee,
      details: {
        comments: commentsInputValue,
        date: new Date(),
        flavors: selections,
      },
    };

    setTastingHistory((tastingHistory) => [newEntry, ...tastingHistory]);
    window.alert(
      `${selectedCoffee?.name} saved with ${selections} & notes : ${commentsInputValue}`
    );
    handleCancel();
  };

  const historyForSelectedCoffee = tastingHistory?.filter(
    (entry) => entry.coffee.name === selectedCoffee?.name
  );

  return (
    <div className="App w-screen max-h-screen flex flex-col">
      <NewCoffeeModal
        handleSaveNewCoffee={handleSaveNewCoffee}
        open={showNewCoffeeModal}
        toggleModal={toggleNewCoffeeModal}
      />
      <div className="p-2 sm:p-12">
        <h1 className="text-md sm:text-lg">Coffee Wheel</h1>
        <div className="flex justify-between p-2 sm:justify-start">
          <CoffeeDropdown
            open={showCoffeeDropdown}
            options={coffeeOptions}
            selectedCoffee={selectedCoffee}
            toggleOpen={toggleCoffeeDropdown}
            toggleNewCoffeeModal={toggleNewCoffeeModal}
            handleSelectCoffee={handleSelectCoffee}
          />
          <div className="flex gap-4 px-2">
            <TastingNotes
              commentsInputValue={commentsInputValue}
              setCommentsInputValue={setCommentsInputValue}
            />
            <button onClick={handleCancel}>Reset</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row">
          <section className="flex-1 mt-4 sm:max-w-2xl">
            <HistoryContext.Provider value={historyForSelectedCoffee}>
              <Wheel
                flavourBreadcrumb={flavourBreadcrumb}
                setFlavourBreadcrumb={setFlavourBreadcrumb}
                selections={selections}
                setSelections={setSelections}
              />
            </HistoryContext.Provider>
          </section>
          <section className="flex-1">
            <FullBreadcrumb selections={selections} />
            {/* <TastingHistory
              history={historyForSelectedCoffee}
              setSelections={setSelections}
            /> */}
            {/* <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button> */}
          </section>
        </div>
      </div>
    </div>
  );
}
