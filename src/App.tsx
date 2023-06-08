import React, { useState } from 'react';
import "./App.css";
import { CoffeeDropdown } from "./components/CoffeeDropdown";
import { Wheel } from "./components/wheel";
import { Coffee } from './types';
import { CoffeeDetails } from './components/CoffeeDetails';

function App() {

  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | never>(null);

const handleSelectCoffee = (coffee) => setSelectedCoffee(coffee); 

  return (
    <div className="App w-screen p-12">
      <h1>Coffee Wheel</h1>
      <div className="flex w-full">
        <section className="flex-1">
          <CoffeeDropdown selectedCoffee={selectedCoffee} handleSelectCoffee={handleSelectCoffee} />
          <CoffeeDetails coffee={selectedCoffee} />
        </section>
        <section className="flex-1"> <Wheel /></section>
      </div>
    </div>
  );
}

export default App;
