import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNDYyZjZiYWVlZWUyNzk0ZDMzNzVlIn0sImlhdCI6MTY0Nzg2NDMxMH0.jp-O0SC1D3ks_ScD4ZDrFno9rA8qUfuuKNBPb1cI1ew",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  //Get all notes
  const getNotes = async () => {
    //TODO: API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNDYyZjZiYWVlZWUyNzk0ZDMzNzVlIn0sImlhdCI6MTY0Nzg2NDMxMH0.jp-O0SC1D3ks_ScD4ZDrFno9rA8qUfuuKNBPb1cI1ew",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Delete a note
  const deleteNote = async (id) => {
    //TODO: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNDYyZjZiYWVlZWUyNzk0ZDMzNzVlIn0sImlhdCI6MTY0Nzg2NDMxMH0.jp-O0SC1D3ks_ScD4ZDrFno9rA8qUfuuKNBPb1cI1ew",
      },
    });
    const json = response.json();

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CAll
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzNDYyZjZiYWVlZWUyNzk0ZDMzNzVlIn0sImlhdCI6MTY0Nzg2NDMxMH0.jp-O0SC1D3ks_ScD4ZDrFno9rA8qUfuuKNBPb1cI1ew",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
