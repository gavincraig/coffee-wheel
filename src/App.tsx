import React, { useState } from 'react';
import "./App.css";
import { CoffeeDropdown } from "./components/CoffeeDropdown";
import { Wheel } from "./components/Wheel";
import { Coffee, TastingHistoryEntry, FlavourBreadcrumbEntry } from './types';
import { CoffeeDetails } from './components/CoffeeDetails';
import { TastingNotes } from './components/TastingNotes';
import { TastingHistory } from './components/TastingHistory';
import { MOCK_COFFEE } from './constants'
import FullBreadcrumb from './components/FlavourBreadcrumb/FlavourBreadcrumb';

function App() {

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | never>();
  const [isNewCoffee, setIsNewCoffee] = useState(false);
  const [flavourBreadcrumb, setFlavourBreadcrumb] = useState<FlavourBreadcrumbEntry[] | []>([]);
  const [selections, setSelections] = useState<string[] | []>([]);

  const [coffeeNameInputValue, setCoffeeNameInputValue] = useState('');
  const [originInputValue, setOriginInputValue] = useState('');
  const [processInputValue, setProcessInputValue] = useState('');
  const [varietalInputValue, setVarietalInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');

  const [coffeeOptions, setCoffeeOptions] = useState<Coffee[] | []>(MOCK_COFFEE);
  const [tastingHistory, setTastingHistory] = useState<TastingHistoryEntry[]>([]);

const handleSelectCoffee = (coffee: Coffee) => setSelectedCoffee(coffee); 

const handleAddNewCoffee = () => {
  setIsNewCoffee(true)
  setSelectedCoffee({name: '', origin: '', process: '', varietal: ''})
}

const handleClearInputs = () => {
  setCoffeeNameInputValue('');
  setOriginInputValue('');
  setProcessInputValue('');
  setVarietalInputValue('');
  setCommentsInputValue('');
}

const handleCancel = () => {
  setIsNewCoffee(false);
  handleResetSelections();
  handleResetSelectedCoffee();
  handleClearInputs();
}

const handleResetSelectedCoffee = () => {
  setSelectedCoffee({name: '', origin: '', process: '', varietal: ''})
}

const handleResetSelections = () => {
  setSelections([]);
  setFlavourBreadcrumb([]);
}

const handleAddCoffeeToCoffeeList = (newCoffee: Coffee) => setCoffeeOptions([newCoffee, ...coffeeOptions])

const handleSave = () => {
  const newCoffee = {name: coffeeNameInputValue, origin: originInputValue, process: processInputValue, varietal: varietalInputValue}

  isNewCoffee && handleAddCoffeeToCoffeeList(newCoffee);

  const newEntry = {
    coffee: isNewCoffee ? newCoffee : selectedCoffee,
    details: {
      comments: commentsInputValue,
      date: new Date(),
      flavors: selections
    }
  }

  setTastingHistory((tastingHistory) => [newEntry, ...tastingHistory]);
  window.alert(`${selectedCoffee?.name || coffeeNameInputValue} saved with ${selections} & notes : ${commentsInputValue}`)
  handleCancel();
}

const historyForSelectedCoffee = tastingHistory?.filter((entry) => entry.coffee.name === selectedCoffee?.name);

  return (
    <div className="App w-screen p-12">
      <h1>Coffee Wheel</h1>
      <div className="flex w-full">
        <section className="flex-1">
          {
            isNewCoffee 
            ? <input placeholder={'my new coffee'} value={coffeeNameInputValue} onChange={(e) => setCoffeeNameInputValue(e.target.value)}/> 
            : <CoffeeDropdown options={coffeeOptions} selectedCoffee={selectedCoffee} handleSelectCoffee={handleSelectCoffee} handleAddNewCoffee={handleAddNewCoffee} />
          }
          <CoffeeDetails coffee={selectedCoffee} isNewCoffee={isNewCoffee}
           coffeeNameInputValue={coffeeNameInputValue} originInputValue={originInputValue}
            processInputValue={processInputValue} setCoffeeNameInputValue={setCoffeeNameInputValue} 
            setOriginInputValue={setOriginInputValue} varietalInputValue={varietalInputValue} setVarietalInputValue={setVarietalInputValue} setProcessInputValue={setProcessInputValue} 
            />
          <TastingNotes commentsInputValue={commentsInputValue} setCommentsInputValue={setCommentsInputValue} />
          <TastingHistory history={historyForSelectedCoffee} setSelections={setSelections} />
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSave}>Save</button>
          <FullBreadcrumb selections={selections} />
        </section>
        <section className="flex-1">
          <Wheel flavourBreadcrumb={flavourBreadcrumb} setFlavourBreadcrumb={setFlavourBreadcrumb}
          selections={selections} setSelections={setSelections} />
        </section>
      </div>
    </div>
  );
}

export default App;
