import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [headingText, setHeadingText] = useState("");
  const [isBackground, setBackground] = useState(false);
  
  function handleChange(event){
    setValue(event.target.value);
  }

  function handleClick(){
    setHeadingText(value);
  }

  function handleMouseOver() {
    setBackground(true);
  }

  function handleMouseOut() {
    setBackground(false)
  }

  return (
    <div className="container">
      <h1>Hello  {headingText}</h1>
      <input 
        onChange={handleChange} 
        type="text" 
        placeholder="What's your name?" 
        value = {value}
      />
      <button 
        style= {isBackground ? {backgroundColor:"black"} : {}} 
        onMouseOver={handleMouseOver} 
        onMouseOut={handleMouseOut} 
        onClick={handleClick}>
        Submit
      </button>
    </div>
  );
}

export default App;
