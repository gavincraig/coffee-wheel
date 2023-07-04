import React, { useState } from "react";
import { Coffee } from "../../types";
import { Modal } from "../primatives/Modal";
import NewCoffeeForm from "./NewCoffeeForm/NewCoffeeForm";
import { ConfirmCoffee } from "./ConfirmCoffee";

type NewCoffeeModalProps = {
  handleSaveNewCoffee: (newCoffee: Coffee) => void;
  open: boolean;
  toggleModal: () => void;
};

const NewCoffeeModal = ({
  handleSaveNewCoffee,
  open,
  toggleModal,
}: NewCoffeeModalProps) => {
  const [step, setStep] = useState(0);
  const [nameInputValue, setNameInputValue] = useState("");
  const [originInputValue, setOriginInputValue] = useState("");
  const [processInputValue, setProcessInputValue] = useState("");
  const [varietalInputValue, setVarietalInputValue] = useState("");

  const onSubmit = () => {
    const newCoffee: Coffee = {
      name: nameInputValue,
      origin: originInputValue,
      process: processInputValue,
      varietal: varietalInputValue,
    };
    handleSaveNewCoffee(newCoffee);
  };

  const handleNextStep = () => {
    setStep((step) => step + 1);
  };

  const handleClickSave = () => {
    onSubmit();
    handleNextStep();
  };

  type StepDetails = {
    title: string;
    description: string;
    content: React.ReactNode;
    ctaButtons?: React.ReactNode;
  };

  const addDetailsStep: StepDetails = {
    title: "Add Coffee",
    description: "Add a new coffe to your collection",
    ctaButtons: <button onClick={handleClickSave}>Save</button>,
    content: (
      <NewCoffeeForm
        values={{
          nameInputValue,
          originInputValue,
          processInputValue,
          varietalInputValue,
        }}
        callbacks={{
          setNameInputValue,
          setOriginInputValue,
          setProcessInputValue,
          setVarietalInputValue,
        }}
      />
    ),
  };

  const confirmedStep: StepDetails = {
    title: "Successfully added coffee",
    description: `${nameInputValue} has been added to your collection`,
    content: <ConfirmCoffee />,
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
