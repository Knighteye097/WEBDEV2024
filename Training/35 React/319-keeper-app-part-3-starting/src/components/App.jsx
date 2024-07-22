import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  
  const[noteList, setNoteList] = useState([]);

  function addItem(noteItem){
    setNoteList(prevValue => {
      return [
        ...prevValue,
        noteItem
      ];
    });
  }

  function deleteItem(id){
    setNoteList(prevValue => {
      return prevValue.filter((item,index) => (index !== id));
    })
  }

  return (
    <div>
      <Header />
      <CreateArea 
        handleClickEvent = {addItem}
      />
      {noteList.map((note,index) => 
        <Note 
          key={index}
          id = {index} 
          title= {note.title} 
          content={note.content}
          handleDeleteEvent={deleteItem}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
