import React, { useState }from "react";

function App() {
  let [count, setCount] = useState(0)

  function updateCount() {
    setCount(count+1);
  }

  function decreaseCount() {
    setCount(count-1);
  }


  return <div className="container">
    <h1>{count}</h1>
    <button onClick={updateCount}>+</button>
    <button onClick={decreaseCount}>-</button>
  </div>;
}

export default App;
