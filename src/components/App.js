import Header from "./Header";
import React, { useState } from "react";
import Keypad from "./Keypad";
import Display from "./Display";
import Button from "./Button";

export default function App() {
  const [displayValue, setDisplayValue] = useState("");
  // const [currentValue, setCurrentValue] = useState("");
  const [previousOperator, setPreviousOperator] = useState("");
  const [previousValue, setPreviousValue] = useState("");

  function handleButtonClick(button) {
    // console.log("Button was clicked!", button);
    switch (button.type) {
      case "number":
        // Append the number to the displayValue
        setDisplayValue((prevDisplayValue) => prevDisplayValue + button.text);
        break;

      case "clear":
        if (button.text === "AC") {
          // Clear everything
          setDisplayValue("");
          setPreviousValue("");
          setPreviousOperator("");
          // setCurrentValue("");
        } else if (button.text === "C") {
          // Remove the last character from the displayValue
          setDisplayValue((prevDisplayValue) =>
            prevDisplayValue.slice(0, prevDisplayValue.length - 1)
          );
        }
        break;

      case "operator":
        // If no previous operator has been chosen, set the displayValue as the previousValue. The previous value is the first ioperand of the operation and the curretn display is the second operand.
        if (previousOperator === "") {
          setPreviousValue(displayValue);
        } else {
          switch (previousOperator) {
            case "add":
              setPreviousValue(
                (prevValue) => prevValue + parseFloat(displayValue)
              );
              break;
            case "subtract":
              setPreviousValue(
                (prevValue) => prevValue - parseFloat(displayValue)
              );
              break;
            case "multiply":
              setPreviousValue(
                (prevValue) => prevValue * parseFloat(displayValue)
              );
              break;
            case "divide":
              setPreviousValue(
                (prevValue) => prevValue / parseFloat(displayValue)
              );
              break;
            default:
              break;
          }
        }
    }
  }

  return (
    <>
      <Header title="Reactulator" />
      <div className="wrapper">
        <Display value={displayValue} />
        <Keypad onButtonClick={handleButtonClick} />
      </div>
    </>
  );
}
