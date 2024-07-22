import React, { useState }from "react";

function App() {
  let [time, setTime] = useState("TIME");

  function updateTime(){
    let time = new Date().toLocaleTimeString();
    setTime(time.slice(0, time.length-2));
  }

  {setInterval(updateTime)}

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
