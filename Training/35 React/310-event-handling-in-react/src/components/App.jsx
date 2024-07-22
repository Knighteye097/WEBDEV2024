import React, { useState }from "react";

function App() {

  const mouseEnterStyle = {
    backgroundColor : "black"
  };

  const mouseLeaveStyle = {
    backgroundColor : "white"
  }

  const [style, setStyle] = useState(mouseLeaveStyle);

  function whenMouseEnters() {
    setStyle(mouseEnterStyle)
  }

  function whenMouseLeaves() {
    setStyle(mouseLeaveStyle)
  }

  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button style= {style} onMouseOut={whenMouseLeaves} onMouseOver={whenMouseEnters}>Submit</button>
    </div>
  );
}

export default App;
