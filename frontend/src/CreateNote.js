import React, { useState } from "react";

function CreateNote (props){
    const [note, setNote] = useState("");
    function onChange (event){
        setNote(event.target.value);
    }
    return (
    <div>
        <input name="note" className="note-input" onChange={onChange} value={note}></input>
        <button className="add-button" onClick={() => {
            props.clicked(note);
            setNote("");
        }}>+</button>
    </div>);
}

export default CreateNote;