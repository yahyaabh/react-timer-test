import react from "react";

import "./styles.css";

import { useState, useEffect } from "react";

const App = () => {
  //useState hooks
  const [minutes, setMinutes] = useState(0);

  const [start, setStart] = useState(false);

  const [seconds, setSeconds] = useState(0);

  //funct for updating time

  function updateTime() {
    setSeconds((seconds) => seconds - 1);
  }
  //changes seconds when start is true

  useEffect(() => {
    if (start) {
      const id = setInterval(() => {
        updateTime();
      }, 1000);

      return () => clearInterval(id);
    } else;

    return undefined;
  }, [start]);

  //checks if seconds are 0 to stop the timer

  useEffect(() => {
    if (seconds === 0) {
      setStart(false);
      setSeconds(0);
      setMinutes(0);
    }
  }, [seconds]);

  //start the timer on click

  const startTime = (e) => {
    e.preventDefault();
    setStart(true);
  };
  useEffect(() => {
    if (start) {
      if (seconds % 60 === 0) {
        setMinutes((mins) => mins - 1);
      }
      if (minutes === 0) {
        setMinutes(0);
      }
    }
  }, [seconds, start]);
  //handlers of buttons
  const stopTime = (e) => {
    e.preventDefault();
    setStart(false);
  };

  const resetHandler = () => {
    setStart(false);
    setSeconds(0);
    setMinutes(0);
  };

  const setTime = (e) => {
    e.preventDefault();
    setSeconds(minutes * 60);
  };

  //set mins to value on submit

  function submitHandler(e) {
    e.preventDefault();
    setMinutes(e.target.value);
  }

  //returned
  return (
    <div className="content">
      <form className="container">
        <input
          value={minutes}
          onChange={submitHandler}
          placeholder="set mins to ..."
        />
        <button onClick={setTime}>enter</button>
        <button disabled={start} onClick={startTime}>
          start
        </button>
      </form>
      <div className="container">
        <button disabled={!start} onClick={stopTime}>
          stop
        </button>
        <button onClick={resetHandler}>reset</button>
        <p>{`${minutes} : ${seconds % 60}`}</p>
      </div>
    </div>
  );
};

export default App;
