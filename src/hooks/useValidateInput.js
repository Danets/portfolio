import { useState } from "react";

const useValidateInput = (validatorFunc) => {
  const [value, setInputValue] = useState("");
  const [isTouchedInput, setTouchedInput] = useState(false);
  const isInputValid = validatorFunc(value);
  const isInputInvalid = !isInputValid && isTouchedInput;

  const handleChangeInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputFocus = () => {
    setTouchedInput(true);
  };

  const resetValues = () => {
    setInputValue("");
    setTouchedInput(false);
  };

  return {
    value,
    isInputValid,
    isInputInvalid,
    handleInputFocus,
    handleChangeInput,
    resetValues
  };
};

export default useValidateInput;
