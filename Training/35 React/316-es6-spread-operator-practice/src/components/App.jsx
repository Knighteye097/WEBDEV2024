import React, { useState } from "react";
import ListItem from "./ListItem";

function App() {
  const [id, setId] = useState(0);
  const [toDoItem, setToDoItem] = useState("");
  const [itemLists, setItemLists] = useState([]);

  function handleChange(event){
    const {value} = event.target;
    setToDoItem(value);
  }

  function handleClick() {
    setId(id+1);
    setItemLists(prevValue => {
      return [
        ...prevValue,
        {
          id : id,
          itemName: toDoItem
        }
      ];
    });

    setToDoItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange} 
          type="text" 
          value={toDoItem}
        />
        <button
          onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemLists.map(item => 
            <ListItem 
              key = {item.id}
              itemName = {item.itemName}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
