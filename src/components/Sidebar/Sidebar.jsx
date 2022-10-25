import React from "react"

export default function Sidebar(props) {
    //note elements will be an array which a div with a key of note id
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                //if note id matches currentNote.id gets className selected note otherwise no other clases
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                //onclick will call parent function setCurrentNoteId with the selected notes id
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">Note {index + 1}</h4>
            </div>
        </div>
    ))

    return (
        //the sidebar is a section it has a button to create a new note and will then display all other notes
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
