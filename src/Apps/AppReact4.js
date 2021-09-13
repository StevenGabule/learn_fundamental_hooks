import React from "react";
import "./AppReact4.css";

const operators = ["-", "/", "*", "+"];

function AppReact4() {
  const [display, setDisplay] = React.useState({
    currentNum: 0,
    currentPrev: 0,
  });

  const [checkValues, setCheckValues] = React.useState(false);
  const [operator, setOperator] = React.useState(false);
  const [catchOperator, setCatchOperator] = React.useState([]);
  const [previousCal, setPreviousCal] = React.useState(0);
  const [clearInput, setClearInput] = React.useState(false);

  function handleClick(val) {
    if (clearInput) {
      setDisplay({
        currentNum: 0,
        currentPrev: 0,
      });
      setClearInput(false);
    }

    if (operators.includes(String(val))) {
      // if (catchOperator.length <= 1) {
      //   setCatchOperator((oldOperator) => [...oldOperator, String(val)]);
      // }
      setDisplay((prevValue) => ({
        ...prevValue,
        currentNum: String(val),
        currentPrev: operator
          ? String(val) == "-"
            ? prevValue.currentPrev + "" + String(val)
            : prevValue.currentPrev
          : prevValue.currentPrev + "" + String(val),
      }));

      setOperator(true);
    } else {
      if (checkValues) {
        setDisplay((prevValue) => ({
          ...prevValue,
          currentNum:
            operator === true
              ? String(val)
              : // eslint-disable-next-line eqeqeq
              prevValue.currentNum === String(val)
              ? String(val)
              : prevValue.currentNum + "" + String(val),
          currentPrev:
            // eslint-disable-next-line eqeqeq
            prevValue.currentNum === String(val)
              ? String(val)
              : prevValue.currentPrev + "" + String(val),
        }));
        setOperator(false);
      } else {
        setDisplay({
          currentNum: "",
          currentPrev: "",
        });
        setCheckValues(true);
        setDisplay((prevValue) => ({
          ...prevValue,
          currentNum:
            operator === true
              ? String(val)
              : prevValue.currentNum + "" + String(val),
          currentPrev: prevValue.currentPrev + "" + String(val),
        }));
      }
    }
  }

  function handleClearClick() {
    setDisplay({ currentNum: 0, currentPrev: 0 });
    setCheckValues(false);
    setPreviousCal(0);
    setCatchOperator([]);
    setClearInput(true);
  }

  function handleCalculateClick() {
    console.log(display);
    setDisplay((prevCurrent) => ({
      // eslint-disable-next-line no-eval
      currentNum: eval(String(prevCurrent.currentPrev)),
      currentPrev:
        prevCurrent.currentPrev + " = " + eval(String(prevCurrent.currentPrev)),
    }));
    setClearInput(true);
  }

  function handleClickInputDot() {
    if (!/\./.test(display.currentNum)) {
      setDisplay((prevD) => ({
        currentNum: prevD.currentNum + ".",
        currentPrev: prevD.currentPrev + ".",
      }));
    }
  }

  return (
    <div className="container">
      <div id="preview" className="preview">
        {display.currentPrev}
      </div>

      <div id="display" className="displayInput">
        {display.currentNum}
      </div>

      <div className="row">
        <button className="jumbo" id="clear" onClick={handleClearClick}>
          AC
        </button>
        <button id="divide" onClick={() => handleClick("/")}>
          /
        </button>
        <button id="multiply" onClick={() => handleClick("*")}>
          X
        </button>
      </div>

      <div className="row">
        <button id="seven" onClick={() => handleClick(7)}>
          7
        </button>
        <button id="eight" onClick={() => handleClick(8)}>
          8
        </button>
        <button id="nine" onClick={() => handleClick(9)}>
          9
        </button>
        <button id="subtract" onClick={() => handleClick("-")}>
          -
        </button>
      </div>

      <div className="row">
        <button id="four" onClick={() => handleClick(4)}>
          4
        </button>
        <button id="five" onClick={() => handleClick(5)}>
          5
        </button>
        <button id="six" onClick={() => handleClick(6)}>
          6
        </button>
        <button id="add" onClick={() => handleClick("+")}>
          +
        </button>
      </div>

      <div className="row">
        <div className="row-inner-left">
          <div className="section-1">
            <button id="one" onClick={() => handleClick(1)}>
              1
            </button>
            <button id="two" onClick={() => handleClick(2)}>
              2
            </button>
            <button id="three" onClick={() => handleClick(3)}>
              3
            </button>
          </div>
          <div className="section-1">
            <button id="zero" onClick={() => handleClick(0)}>
              0
            </button>
            <button
              id="decimal"
              onClick={handleClickInputDot}
              style={{ fontWeight: "bold", fontSize: 16 }}
            >
              .
            </button>
          </div>
        </div>

        <div className="row-inner-right">
          <button id="equals" onClick={handleCalculateClick}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppReact4;
