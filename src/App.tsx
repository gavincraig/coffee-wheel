import React, { useState } from "react";
import "./App.css";
import { CoffeeDropdown } from "./components/CoffeeDropdown";
import { Wheel } from "./components/Wheel";
import { Coffee, TastingHistoryEntry, FlavourBreadcrumbEntry } from "./types";
import { CoffeeDetails } from "./components/CoffeeDetails";
import { TastingNotes } from "./components/TastingNotes";
import { TastingHistory } from "./components/TastingHistory";
import { MOCK_COFFEE } from "./constants";
import FullBreadcrumb from "./components/FlavourBreadcrumb/FlavourBreadcrumb";
import { Modal } from "./components/primatives/Modal";
import { NewCoffeeModal } from "./components/NewCoffeeModal";
import { HistoryContext } from "./context/HistoryContext";

export default function App() {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | never>();
  const [isNewCoffee, setIsNewCoffee] = useState(false);
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

  const toggleNewCoffeeModal = () => {
    console.log("called");
    setShowNewCoffeeModal((showNewCoffeeModal) => !showNewCoffeeModal);
  };

  const toggleCoffeeDropdown = () =>
    setShowCoffeeDropdown((showCoffeeDropdown) => !showCoffeeDropdown);

  const handleSelectCoffee = (coffee: Coffee) => setSelectedCoffee(coffee);

  const handleAddNewCoffee = () => {
    setIsNewCoffee(true);
    setSelectedCoffee({ name: "", origin: "", process: "", varietal: "" });
  };

  const handleCancel = () => {
    setIsNewCoffee(false);
    handleResetSelections();
    handleResetSelectedCoffee();
  };

  const handleResetSelectedCoffee = () => {
    setSelectedCoffee({ name: "", origin: "", process: "", varietal: "" });
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
            toggleDropdown={toggleCoffeeDropdown}
            options={coffeeOptions}
            selectedCoffee={selectedCoffee}
            handleSelectCoffee={handleSelectCoffee}
            handleAddNewCoffee={handleAddNewCoffee}
            handleSaveNewCoffee={handleSaveNewCoffee}
            toggleNewCoffeeModal={toggleNewCoffeeModal}
            toggleCoffeeDropdown={toggleCoffeeDropdown}
          />
          <div className="flex gap-4 px-2">
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
            {/* <TastingNotes
              commentsInputValue={commentsInputValue}
              setCommentsInputValue={setCommentsInputValue}
            /> */}
            <TastingHistory
              history={historyForSelectedCoffee}
              setSelections={setSelections}
            />
            {/* <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSave}>Save</button> */}
          </section>
        </div>
      </div>
    </div>
  );
}
