import React, { useState } from 'react';
import "./App.css";
import { CoffeeDropdown } from "./components/CoffeeDropdown";
import { Wheel } from "./components/wheel";
import { Coffee, TastingHistoryEntry } from './types';
import { CoffeeDetails } from './components/CoffeeDetails';
import { TastingNotes } from './components/TastingNotes';
import { TastingHistory } from './components/TastingHistory';
import { MOCK_COFFEE } from './constants'

function App() {

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | never>(null);
  const [isNewCoffee, setIsNewCoffee] = useState(false);
  const [flavourBreadcrumb, setFlavourBreadcrumb] = useState([]);
  const [selections, setSelections] = useState([]);

  const [coffeeNameInputValue, setCoffeeNameInputValue] = useState('');
  const [originInputValue, setOriginInputValue] = useState('');
  const [processInputValue, setProcessInputValue] = useState('');
  const [varietalInputValue, setVarietalInputValue] = useState('');
  const [commentsInputValue, setCommentsInputValue] = useState('');

  const [coffeeOptions, setCoffeeOptions] = useState(MOCK_COFFEE);
  const [tastingHistory, setTastingHistory] = useState<TastingHistoryEntry[] | []>([]);

  const handleInputChange = (updateStateFunction, value) => {
    updateStateFunction(value);
  }

const handleSelectCoffee = (coffee) => setSelectedCoffee(coffee); 

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

const handleAddCoffeeToCoffeeList = (newCoffee) => {
  
  setCoffeeOptions([newCoffee, ...coffeeOptions])
}

const handleSave = () => {
  console.log(`save ${coffeeNameInputValue || selectedCoffee?.name} with flavours ${selections}`)
  console.log('notes : ', commentsInputValue)

  const newCoffee = {name: coffeeNameInputValue, origin: originInputValue, process: processInputValue, varietal: varietalInputValue}

  isNewCoffee && handleAddCoffeeToCoffeeList(newCoffee);
  
  const coffeeForEntry = isNewCoffee ? newCoffee : selectedCoffee

  const newEntry = {
    coffee: coffeeForEntry,
    details: {
      comments: commentsInputValue,
      date: new Date(),
      flavors: selections
    }
  }

  setTastingHistory((tastingHistory) => [newEntry, ...tastingHistory])

  handleClearInputs();
  handleResetSelectedCoffee();
  handleResetSelections();
  setIsNewCoffee(false);

  window.alert(`${selectedCoffee?.name || coffeeNameInputValue} saved with ${selections} & notes : ${commentsInputValue}`)
}

const historyForSelectedCoffee = tastingHistory.filter((entry) => entry.coffee.name === selectedCoffee?.name);
console.log('history : ', historyForSelectedCoffee, tastingHistory, selectedCoffee)

  return (
    <div className="App w-screen p-12">
      <h1>Coffee Wheel</h1>
      <div className="flex w-full">
        <section className="flex-1">
          {
            isNewCoffee ? <input placeholder={'my new coffee'} value={coffeeNameInputValue} onChange={(e) => setCoffeeNameInputValue(e.target.value)}/> : <CoffeeDropdown options={coffeeOptions} selectedCoffee={selectedCoffee} handleSelectCoffee={handleSelectCoffee} handleAddNewCoffee={handleAddNewCoffee} />
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
