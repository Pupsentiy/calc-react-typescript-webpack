import React, { useEffect } from "react";

import { numbers } from "../../common/enum";
import { IButtonsNumber } from "../../page/home/Home";

const ButtonsNumbers: React.FC<IButtonsNumber> = ({
  setInputValue,
  inputValue,
  setHistory,
  setKeyPad,
  keyPad,
}) => {
  const getButtonValue = (num: string) => {
    let inputVal = "";
    let result = null;
    if (num === "=") {
      setHistory(inputValue);
      if (inputValue.length > 0) {
        if (inputValue.includes("√")) {
          inputVal = squareRoot(inputValue);
          result = parseString(inputVal);
          if (inputVal === "Error") {
            setHistory("Некорректное выражение!");
          } else {
            return setInputValue(result);
          }
        } else {
          result = parseString(inputValue);
          setInputValue(result);
        }
        if (result === "Infinity" || result === "NaN") {
          setInputValue("");
          setHistory("Некорректное выражение!");
        }
      }
    } else if (num === "C") {
      setInputValue("");
      inputVal = "";
    } else if (num === "%") {
      const persent = parseString(inputValue);
      inputVal = String(Number(persent) / 100);
      setHistory(persent + "%");
      setInputValue(inputVal);
      inputVal = "";
    } else {
      setInputValue((prevState) => prevState + num);
    }
  };

  useEffect(() => {
    if (keyPad === "Enter") {
      getButtonValue("=");
      setKeyPad("");
    } else if (keyPad === "Escape") {
      getButtonValue("C");
      setKeyPad("");
    }
  }, [keyPad]);

  function calculate(rpn: string[]) {
    let v1, v2;
    let value = null;
    const values: number[] = [];
    for (let i = 0; i < rpn.length; i++) {
      value = rpn[i];
      switch (value) {
        case "+":
          v2 = values.pop();
          v1 = values.pop();
          values.push(Number(v1) + Number(v2));
          break;
        case "-":
          v2 = values.pop();
          v1 = values.pop();
          values.push(Number(v1) - Number(v2));
          break;
        case "x":
          v2 = values.pop();
          v1 = values.pop();
          values.push(Number(v1) * Number(v2));
          break;
        case "/":
          v2 = values.pop();
          v1 = values.pop();
          values.push(Number(v1) / Number(v2));
          break;
        default:
          values.push(parseFloat(value));
      }
    }
    return String(values[0]);
  }

  function getReversePolishNotation(num: string[]) {
    let operator = null;
    const operators: string[] = [];
    const output: string[] = [];
    let value = null;
    for (let i = 0; i < num.length; i++) {
      value = num[i];
      switch (value) {
        case "+":
        case "-":
          if (operators.length) {
            operator = operators.pop();
            while (operator && operator !== "(") {
              output.push(operator);
              operator = operators.pop();
            }
            if (operator) {
              operators.push(operator);
            }
          }
          operators.push(value);
          break;
        case "x":
        case "/":
          if (operators.length) {
            operator = operators.pop();
            while (
              operator &&
              operator !== "(" &&
              operator !== "+" &&
              operator !== "-"
            ) {
              output.push(operator);
              operator = operators.pop();
            }
            if (operator) {
              operators.push(operator);
            }
          }
          operators.push(value);
          break;
        case "(":
          operators.push(value);
          break;
        case ")":
          operator = operators.pop();
          while (operator !== "(") {
            if (!operator) {
              throw "Скобки несовместимы";
            }
            output.push(operator);
            operator = operators.pop();
          }
          break;
        default:
          output.push(value);
      }
    }

    while (operators.length) {
      output.push(operators.pop());
    }

    return calculate(output);
  }

  function parseString(string: string) {
    string = string.replace(/\s+/g, "");

    let part = "";
    const parts = [];
    let prev = "";
    let value = "";

    for (let i = 0; i < string.length; i++) {
      value = string[i];
      switch (value) {
        case "+":
        case "x":
        case "/":
        case "(":
        case ")":
          if (part) {
            parts.push(part);
            part = "";
          }
          parts.push(value);
          break;
        case "-":
          if (part) {
            parts.push(part);
            part = "";
            parts.push(value);
          } else {
            if (
              i === 0 ||
              prev === "+" ||
              prev === "-" ||
              prev === "x" ||
              prev === "/" ||
              prev === "("
            ) {
              part = value;
            } else {
              parts.push(value);
            }
          }
          break;
        default:
          part = part + value;
      }
      prev = value;
    }
    if (part) {
      parts.push(part);
    }
    return getReversePolishNotation(parts);
  }

  function squareRoot(squareString: string) {
    const index = squareString.indexOf("√");
    const sliceNumber = squareString.slice(index + 1, squareString.length);
    const arr = getNumber(sliceNumber);
    let stringRep = null;
    if (arr[1] === "0") {
      return "Error";
    }
    if (index > 0) {
      if (
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
          squareString[index - 1]
        )
      ) {
        stringRep = squareString.replace(arr[0], "x" + arr[1]);
      } else {
        stringRep = squareString.replace(arr[0], arr[1]);
      }
    } else {
      stringRep = squareString.replace(arr[0], arr[1]);
    }

    return stringRep;

    function getNumber(string: string) {
      let number = "";
      for (let i = 0; i < string.length; i++) {
        if (!["+", "*", "/", "-", "(", ")"].includes(string[i])) {
          number += string[i];
        } else {
          return ["√" + number, String(Math.sqrt(Number(number)))];
        }
      }

      return ["√" + number, String(Math.sqrt(Number(number)))];
    }
  }
  

 

  return (
    <>
      {numbers &&
        numbers.map((num: string, i: number) => (
          <button
            className="number"
            key={i}
            onClick={(e) => getButtonValue((e.target as Element).innerHTML)}
          >
            {num}
          </button>
        ))}
    </>
  );
};

export default ButtonsNumbers;
