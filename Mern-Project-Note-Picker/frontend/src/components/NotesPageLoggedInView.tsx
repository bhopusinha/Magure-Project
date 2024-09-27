import { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import AddNoteDialog from "./AddEditNoteDialog";
import { Note as NoteModel } from "../types/note";
import Note from "../pages/note/Note";
import styles from "../styles/NotePage.module.css";
import { ContextType, NoteContext } from "../context/HttpProvider";

const NotesPageLoggedInView = () => {

  const [shouldAddNote, setShouldAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const { showLoding, fetchAndSetNotes, notes, setNotes, showError,ondeleteNote } = useContext(NoteContext) as ContextType;

  useEffect(() => {

    fetchAndSetNotes();

  }, []);


  const noteGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            onNoteClicked={setNoteToEdit}
            note={note}
            className={styles.note}
            onDeleteNote={ondeleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button className="m-4" onClick={() => setShouldAddNote(true)}>
        Add new note
      </Button>

      {showLoding && <Spinner animation="border" variant="primary" />}
      {showError && <p>Something went wrong. Pls refresh the page</p>}

      {!showLoding && !showError && (
        <>{notes.length > 0 ? noteGrid : <p>you don't have any note yet.</p>}</>
      )}

      {shouldAddNote && (
        <AddNoteDialog
          onDismiss={() => setShouldAddNote(false)}
          onNoteSave={(addNote) => {
            setNotes([...notes, addNote]);
            setShouldAddNote(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSave={(update) => {
            setNotes(
              notes.map((existing) =>
                existing._id === update._id ? update : existing
              )
            );

            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};
export default NotesPageLoggedInView;
