import React from 'react'
import './App.css'
import { data } from '../../data'
import Split from 'react-split'
import {nanoid} from 'nanoid'
import Sidebar from '../Sidebar/Sidebar'
import Editor from '../Editor/Editor'

function App() {
  //state notes set to empty array
  const [notes, setNotes] = React.useState([])
    //state currentNoteID set to first notes index and notindex id
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    //function create a new note
    function createNewNote() {
      //makes an object w/ id and body keys
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        //sets notes state to an array w/ the newNote just made and then all the previous notes
        setNotes(prevNotes => [newNote, ...prevNotes])
        //sets currentNodeId to the newNote id we just made
        setCurrentNoteId(newNote.id)
    }
    
    //function to update a note
    function updateNote(text) {
       //this function takes text property
        
        //gets array of old notes
        //go through all notes if the currentNoteId matches return that note w/ the new text otherwise return the note the way it is
        //sets notes to this new mapped array
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
    }
    
    //looks at the array and returns the first note that matches the currentNoteId otherwise returns first note
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

  return (
    <main>
        {
            //if notes length is not zero
            notes.length > 0 
            ?
             //split the sidebar and editor
            //sidebar takes props notes, currentNote,setCurrentNoteId, and newNote
            //if there is a currentNoteId and notes are not zero display the editor
            //editor takes props currentNote and updateNote
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
              //otherwise display the you have no notes with a button to create a new note
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
  )
}

export default App
