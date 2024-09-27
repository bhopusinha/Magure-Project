import React, { createContext, useState } from "react";
import { Note } from "../types/note";
import { User, userLogin, userRegister } from "../types/user";
import { loginUser, SignUpcredential } from "../hooks/api/user";
import { deleteNote, fetchNotes } from "../hooks/api/note";

export interface ContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  onRegister: (input: userRegister) => void;
  showLoding: boolean;
  showError: boolean;
  fetchAndSetNotes: () => void;
  ondeleteNote: (note: Note) => void;
  user:User | undefined
  onLogin:(input:userLogin)=>void
}

export const NoteContext = createContext<ContextType | null>(null);

const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

/*Notes */
  const [notes, setNotes] = useState<Note[]>([]);

  const [showLoding, setShowLoading] = useState(true);
  const [showError, setShowError] = useState(false);


  const fetchAndSetNotes = async () => {
    setShowLoading(true);
    setShowError(false);
    const data = await fetchNotes();
    if (data) {
      setShowLoading(false);
      setNotes(data);
    } else {
      setShowError(true);
      setShowLoading(false);
    }
  };

  async function ondeleteNote(note: Note) {
    const updateNotes = await deleteNote(note, notes);
    if (updateNotes) {
      setNotes(updateNotes);
    }
  }


  /*User */
  const [user,setUser]=useState<User|undefined>();


  async function onRegister(input: userRegister) {
    const userResponse = await SignUpcredential(input);
    if (userResponse) {
      setUser(userResponse);
    }
  }

  async function onLogin(input: userLogin) {
    const userResponse = await loginUser(input);
    if (userResponse) {
      setUser(userResponse);
    }
  }


  const value: ContextType = {
    notes,
    setNotes,
    onRegister,
    showLoding,
    showError,
    fetchAndSetNotes,
    ondeleteNote,
    user,
    onLogin
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
