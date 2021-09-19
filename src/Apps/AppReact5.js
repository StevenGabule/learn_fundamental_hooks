import React from "react";
import "./AppReact5.css";

const sound = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");

function AppReact5() {
  const [displayTime, setDisplayTime] = React.useState(25 * 60);  // 25 mins
  const [breakTime, setBreakTime] = React.useState(5 * 60);       // 5 mins
  const [sessionTime, setSessionTime] = React.useState(25 * 60);  // 25 mins
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const [breakAudio,] = React.useState(sound);

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play()
  };

  const formatTime = (time) => Math.floor(time / 60)

  const formatTimeSession = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return ((minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds));
  };

  const changeTime = (amount, type) => {
    if (type === "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setSessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!timerOn) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setDisplayTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakSound();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakSound();
              onBreakVariable = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);
  };

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
  };


  function Length({title, changeTime, type, time, formatTime, label, labelDown, labelUp}) {
    return (
      <div>
        <h3 id={label}>{title}</h3>
        <div className="time-sets">
          <button id={labelDown} onClick={() => changeTime(-60, type)} className="btn-small deep-purple lighten-2">
            <i className="material-icons">arrow_downward</i>
          </button>
          <h3 id={type === "break" ? "break-length" : "session-length"}>
            {formatTime(time)}
          </h3>
          <button id={labelUp} onClick={() => changeTime(60, type)} className="btn-small deep-purple lighten-2">
            <i className="material-icons">arrow_upward</i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="center-align">
      <h1>Pomodoro Clock</h1>
      <div className="dual-container">
        <Length title="Break length" label="break-label" labelDown="break-decrement" labelUp="break-increment"
                changeTime={changeTime} type="break" time={breakTime} formatTime={formatTime} labelId="breaks"/>
        <Length label="session-label" title="Session length" labelDown="session-decrement" labelUp="session-increment"
                changeTime={changeTime} type="session" time={sessionTime} formatTime={formatTime} labelId="sessions"/>
      </div>
      <h3 id={onBreak ? "" : "timer-label"}>{onBreak ? "Break" : "Session"}</h3>
      <h1>{formatTimeSession(displayTime)}</h1>
      <button className="btn-large deep-purple lighten-2" onClick={controlTime} id="timer-left">
        {timerOn ? (<i className="material-icons">pause_circle_filled</i>) : (
          <i className="material-icons">play_circle_filled</i>)}
      </button>
      <button className="btn-large deep-purple lighten-2" onClick={resetTime}>
        <i className="material-icons">autorenew</i>
      </button>
    </div>
  );
}


export default AppReact5;
