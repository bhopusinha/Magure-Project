import styles from "../../styles/Note.module.css";
import { Note as NoteModel } from "../../types/note";
import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../../styles/utils.module.css";

interface noteProps {
  onNoteClicked: (note: NoteModel) => void;
  note: NoteModel;
  onDeleteNote: (note: NoteModel) => void;
  className?: string;
}

const Note = ({ note, className, onDeleteNote, onNoteClicked }: noteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedtext: string;
  if (updatedAt > createdAt) {
    createdUpdatedtext = "Updated " + formatDate(updatedAt);
  } else {
    createdUpdatedtext = "Created " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => onNoteClicked(note)}
      className={`${styles.noteCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            onClick={(e) => {
              onDeleteNote(note);
              e.stopPropagation();
            }}
            className="text-muted ms-auto"
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer>{createdUpdatedtext}</Card.Footer>
    </Card>
  );
};

export default Note;
