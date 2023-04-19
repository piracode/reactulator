import Header from "./Header";
import React, { useState } from "react";
import Keypad from "./Keypad";
import Display from "./Display";
import Button from "./Button";

export default function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousOperator, setPreviousOperator] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [secondOperand, setSecondOperand] = useState("");
  const [firstOperand, setFirstOperand] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");

  function calculate() {
    switch (previousOperator) {
      case "add":
        return parseFloat(previousValue) + parseFloat(displayValue);
      case "subtract":
        return parseFloat(previousValue) - parseFloat(displayValue);
      case "multiply":
        return parseFloat(previousValue) * parseFloat(displayValue);
      case "divide":
        return parseFloat(previousValue) / parseFloat(displayValue);
      default:
        return parseFloat(displayValue);
    }
  }

  function handleButtonClick(button) {
    // console.log("Button was clicked!", button);
    switch (button.type) {
      case "clear":
        if (button.text === "AC") {
          // Clear everything
          setDisplayValue("");
        } else if (button.text === "C") {
          // Remove the last character from the displayValue
          setDisplayValue((prevDisplayValue) =>
            prevDisplayValue.slice(0, prevDisplayValue.length - 1)
          );
        }
        break;
      case "number":
        // If there is no operator selected yet, add the clicked number to the display value
        if (selectedOperator === "") {
          console.log(
            `line 48 previous value: ${previousValue}/ previousOperator: ${previousOperator}`
          );
          setDisplayValue((prevDisplayValue) =>
            prevDisplayValue === "0"
              ? button.text
              : prevDisplayValue + button.text
          );
        } else {
          // If there is an operator selected, update the second operand with the clicked number
          console.log(
            `line 58 previous value' + ${previousValue}/ previousOperator: ${previousOperator}`
          );
          setSecondOperand(
            (prevSecondOperand) => prevSecondOperand + button.text
          );
          console.log(
            `line 64 previous value' + ${previousValue}/ previousOperator: ${previousOperator}`
          );
          setDisplayValue((prevDisplayValue) =>
            prevDisplayValue === "0"
              ? button.text
              : prevDisplayValue + button.text
          );
          console.log(
            `previous value' + ${previousValue}, previousOperator+ ${previousOperator}`
          );
        }
        break;
      case "operator":
        if (selectedOperator === "") {
          setSelectedOperator(button.value);
          setFirstOperand(parseFloat(displayValue));
          setDisplayValue("");
        } else {
          const result = calculate();
          setSelectedOperator(button.value);
          setFirstOperand(result);
          setSecondOperand("");
          setDisplayValue("");
        }
        break;
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
