import React, { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
  const [state, setState] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    return pauseTimer;
  }, []);

  const startTimer = () => {
    if (timerRef.current === null)
       (timerRef.current = setInterval(() => {
        setState((prev) => {
            if(prev-1 === 0){
                pauseTimer();
                setState(0);
            }
            return prev - 1;
        });
      }, 1000));
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setState(0);
  };

  const handleChange=(e)=>{
      setState(e.target.value);
  }

  return (
    <div className="App">
      <h4>Timer</h4>
      {/* <h3>{state}</h3> */}
      <input type="number" placeholder="00h 00m 00s" onChange={handleChange} value={state} style={{border: '1px solid white', borderBottom:"1px solid black" ,focused: false}}/>
      <br /><br /><button onClick={startTimer}>START</button>{"  "}
      <button onClick={resetTimer}>RESET</button>
    </div>
  );
}
