import { calculatorButtons } from "../globals/calculator-button-data";
// import Button from "./Button";

export default function Keypad(props) {
  // debugger
  return (
    <div className="keypad">
      {calculatorButtons.map((button) => (
        <button
          key={button.className}
          data-type={button["data-type"]}
          className={button.className}
          onClick={() => props.onButtonClick(button)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}
