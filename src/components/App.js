import Header from './Header'
import React, { useState } from 'react'
import Keypad from './Keypad'
import Display from './Display'
import { APP_FOLDER_NAME } from './globals'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default function App() {
  // debugger;
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState('')
  const [isOperatorClicked, setIsOperatorClicked] = useState('')
  const [currentOperator, setCurrentOperator] = useState('')
  const [memoryValue, setMemoryValue] = useState('')
  const [isEqualClicked, setIsEqualClicked] = useState('')

  function handleButtonClick(button) {
    // debugger;
    console.log('Button value: ', button.value)
    switch (button.type) {
      case 'operator':
        if (button.type === 'operator') {
          if (previousValue && currentOperator) {
            const operatorResult = calculate(
              previousValue,
              currentOperator,
              currentValue
            )
            setPreviousValue(operatorResult.toString())
            setCurrentValue('0')
          }
          setIsOperatorClicked(true)
          setCurrentOperator(button.value)
        } else {
          setIsOperatorClicked(false)
        }
        break

      case 'enter':
        // if (button.type === "enter" && previousValue && currentOperator) {
        if (button.type === 'enter' && previousValue && currentOperator) {
          // if (button.type === "enter") {
          const enterResult = calculate(
            previousValue,
            currentOperator,
            currentValue
          )
          setPreviousValue(enterResult.toString())

          if (!isOperatorClicked && currentValue !== '') {
            setIsEqualClicked(true)
            setCurrentValue(enterResult.toString())
          } else {
            setIsEqualClicked(false)
            setCurrentValue('0')
          }
          setIsOperatorClicked(false)
          setCurrentOperator('')
          // }
        }
        break

      case 'number':
        if (currentValue === '0' && !isOperatorClicked) {
          setCurrentValue(button.text.toString())
        } else if (isOperatorClicked) {
          setIsOperatorClicked(false)
          setPreviousValue(currentValue)
          setCurrentValue(button.text.toString())
        } else if (!isOperatorClicked && isEqualClicked) {
          setCurrentValue(button.text.toString())
          setIsEqualClicked(false)
        } else {
          setCurrentValue(
            (prevDisplayValue) =>
              prevDisplayValue.toString() + button.text.toString()
          )
        }
        break

      case 'clear':
        if (button.text === 'AC') {
          setCurrentValue('0')
          setPreviousValue('')
          setIsOperatorClicked(false)
          setCurrentOperator('')
        } else if (button.text === 'C') {
          if (button.text <= 9) {
            setCurrentValue('0')
          } else {
            setCurrentValue((prevDisplayValue) => {
              // console.log("PrevDisplayValue: ", prevDisplayValue);
              return (
                prevDisplayValue.slice(0, prevDisplayValue.length - 1) || '0'
              )
              // return "10";
            })
          }
        }
        break

      case 'memory':
        if (button.value === 'Memory Save') {
          setMemoryValue(currentValue)
          setCurrentValue(memoryValue.toString()) // set current value to memoryValue
        } else if (button.value === 'Memory Recall') {
          setCurrentValue(memoryValue)
        } else if (button.value === 'Memory Clear') {
          setMemoryValue('')
        } else if (button.value === 'Memory Addition') {
          const mPlusResult = Number(currentValue) + Number(memoryValue)
          setCurrentValue(mPlusResult.toString())
        } else if (button.value === 'Memory Subtract') {
          const mMinusResult = Number(currentValue) - Number(memoryValue)
          setCurrentValue(mMinusResult.toString())
        }
        break

      case 'decimal':
        if (!currentValue.toString().includes('.')) {
          setCurrentValue((prevDisplayValue) => prevDisplayValue + '.')
        }
        break

      case 'sign':
        setCurrentValue((prevDisplayValue) => {
          const newValue = parseFloat(prevDisplayValue) * -1
          return newValue.toString()
        })
        break

      case 'percent':
        if (button.value === 'Percent' && currentValue !== '') {
          console.log('condition is met for percent)')
          const percentResult = Number(currentValue) / 100
          setCurrentValue(percentResult.toString())
          return percentResult
        }
        break

      case 'sqrt':
        if (button.value === 'Square Root' && currentValue !== '') {
          console.log('entering the square root case)')
          const SqrtResult = Math.sqrt(Number(currentValue))
          setCurrentValue(SqrtResult.toString())
        }
        break
    }
  }

  function calculate(previousValue, currentOperator, currentValue) {
    switch (currentOperator) {
      case 'Add':
        return parseFloat(previousValue) + parseFloat(currentValue)
      case 'Subtract':
        return parseFloat(previousValue) - parseFloat(currentValue)
      case 'Multiply':
        return parseFloat(previousValue) * parseFloat(currentValue)
      case 'Divide':
        return parseFloat(previousValue) / parseFloat(currentValue)
      default:
        return ''
    }
  }

  return (
    <Router basename={APP_FOLDER_NAME}>
      <>
        <Header title='Reactulator' />
        <div className='wrapper'>
          <Display value={currentValue} />
          <Keypad onButtonClick={handleButtonClick} />
        </div>

        <p>current Value : {currentValue}</p>
        <p>previous Value : {previousValue}</p>
        <p>current operaator : {currentOperator}</p>
        <p>Memory value : {memoryValue}</p>
        <p>{console.log('operator', isOperatorClicked)}</p>
        <p>{console.log('equal', isEqualClicked)}</p>
      </>
    </Router>
  )
}
