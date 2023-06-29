import React, { useState } from "react";
import { Modal } from "../primatives/Modal";
import FormField from "../primatives/forms/FormField/FormField";
import { TextField } from "../primatives/forms/TextField";
import AddDetailsContent from "./AddDetailsContent";
import { Coffee } from "../../types";

type Props = {
  handleSaveNewCoffee: (newCoffee: Coffee) => void;
  open: boolean;
  toggleModal: () => void;
};

const NewCoffeeModal = ({ handleSaveNewCoffee, open, toggleModal }: Props) => {
  const [step, setStep] = useState(0);
  const [coffeeNameInputValue, setCoffeeNameInputValue] = useState("");
  const [originInputValue, setOriginInputValue] = useState("");
  const [processInputValue, setProcessInputValue] = useState("");
  const [varietalInputValue, setVarietalInputValue] = useState("");

  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const handleClearInputs = () => {
    setCoffeeNameInputValue("");
    setOriginInputValue("");
    setProcessInputValue("");
    setVarietalInputValue("");
  };

  const onSubmit = () => {
    const newCoffee: Coffee = {
      name: coffeeNameInputValue,
      origin: originInputValue,
      process: processInputValue,
      varietal: varietalInputValue,
    };

    handleSaveNewCoffee(newCoffee);
  };

  const handleClickSave = () => {
    onSubmit();
    handleNextStep();
  };

  const ConfirmDetailsButton = () => {
    return <button onClick={handleClickSave}>Save</button>;
  };

  const addDetailsStep: StepDetails = {
    title: "Add Coffee",
    description: "Add a new coffe to your collection",
    ctaButtons: <ConfirmDetailsButton />,
    content: (
      <AddDetailsContent
        values={{
          coffeeNameInputValue,
          originInputValue,
          processInputValue,
          varietalInputValue,
        }}
        callbacks={{
          setCoffeeNameInputValue,
          setOriginInputValue,
          setProcessInputValue,
          setVarietalInputValue,
        }}
      />
    ),
  };

  type StepDetails = {
    title: string;
    description: string;
    content: React.ReactNode;
    ctaButtons?: React.ReactNode;
  };

  const ConfirmDetailsContent = () => {
    return <div className="animate-fade-in-slow">hooray!</div>;
  };

  const confirmedStep: StepDetails = {
    title: "Successfully added coffee",
    description: `${coffeeNameInputValue} has been added to your collection`,
    content: <ConfirmDetailsContent />,
  };

  const currentStepDetails = step === 0 ? addDetailsStep : confirmedStep;

  return (
    <Modal
      open={open}
      toggleModal={toggleModal}
      title={currentStepDetails.title}
      description={currentStepDetails.description}
      hideOpenButton
      openButtonText="New Coffee"
      closeButtonText="Close"
      ctaButtons={currentStepDetails.ctaButtons}
    >
      <div className="animate-fade-in">{currentStepDetails.content}</div>
    </Modal>
  );
};

export default NewCoffeeModal;
