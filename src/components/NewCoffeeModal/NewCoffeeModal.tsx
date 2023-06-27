import React, { useState } from "react";
import { Modal } from "../primatives/Modal";
import FormField from "../primatives/forms/FormField/FormField";
import { TextField } from "../primatives/forms/TextField";
import AddDetailsContent from "./AddDetailsContent";

type Props = {
  values: Record<string, string>;
  callbacks: Record<string, (arg: string) => void>;
  handleSaveNewCoffee: () => void;
};

const NewCoffeeModal = ({ values, callbacks, handleSaveNewCoffee }: Props) => {
  const [step, setStep] = useState(0);

  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const handleClickSave = () => {
    handleSaveNewCoffee();
    handleNextStep();
  }

  const ConfirmDetailsButton = () => {
    return <button onClick={handleClickSave}>Save</button>;
  };

  const addDetailsStep: StepDetails = {
    title: "Add Coffee",
    description: "Add a new coffe to your collection",
    ctaButtons: <ConfirmDetailsButton />,
    content: <AddDetailsContent values={values} callbacks={callbacks} />
  };
  
  type StepDetails = {
    title: string;
    description: string;
    content: React.ReactNode;
    ctaButtons?: React.ReactNode;
  };

  const ConfirmDetailsContent = () => {
    return <div className="animate-fade-in-slow">hooray!</div>
  }

  const confirmedStep: StepDetails = {
    title: "Successfully added coffee",
    description: `${values.coffeeNameInputValue} has been added to your collection`,
    content: <ConfirmDetailsContent />
};

  const currentStepDetails = step === 0 ? addDetailsStep : confirmedStep;

  return (
    <Modal
      title={currentStepDetails.title}
      description={currentStepDetails.description}
      openButtonText="New Coffee"
      closeButtonText="Close"
      ctaButtons={currentStepDetails.ctaButtons}
    >
      <div className="animate-fade-in">
        {currentStepDetails.content}
      </div>
    </Modal>
  );
};

export default NewCoffeeModal;
