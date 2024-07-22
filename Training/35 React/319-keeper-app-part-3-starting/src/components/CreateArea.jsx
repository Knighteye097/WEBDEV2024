import React, { useState } from "react";

function CreateArea(props) {

  const [noteItem, setNoteItem] = useState({
    title: "",
    content: ""
  });

  function handleChange(event){
    const {name, value} = event.target;

    setNoteItem(prevValue => {
      return {
        ...prevValue,
        [name] : value
      }
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    props.handleClickEvent(noteItem);
    setNoteItem({
      title: "",
      content: ""
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange} 
          name="title" 
          placeholder="Title" 
          value = {noteItem.title}
        />
        <textarea 
          onChange={handleChange}
          name="content" 
          placeholder="Take a note..." 
          rows="3" 
          value={noteItem.content}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
