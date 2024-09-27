import api from "../axios/api";
import { createNote, Note as NoteModal, updateNote } from "../../types/note";

/*api call for fetching Notes */
export const fetchNotes = async (): Promise<NoteModal[] | undefined> => {
  try {
    const response = await api.get(`/api/notes`);
    return response.data;
  } catch (error) {
    console.log(error);
    // alert(error);
  }
};

/*api call for creating Notes */
export const createNotes = async (input: createNote) => {
  try {
    const noteResponse = await api.post("/api/notes/add", input);

    return noteResponse.data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

/*api call for deleting Notes */
export async function deleteNote(
  note: NoteModal,
  notes: NoteModal[]
): Promise<NoteModal[] | undefined> {
  try {
    // console.log(notes);

    await api.delete(`/api/notes/${note._id}`);

    const updateNotes = notes.filter((item) => item._id !== note._id);
    return updateNotes;
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

/*api call for updating Notes */
export async function updateNotes(noteId: string, noteInput: updateNote) {
  try {
    const response = await api.patch(`/api/notes/${noteId}`, noteInput);

    return response.data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
