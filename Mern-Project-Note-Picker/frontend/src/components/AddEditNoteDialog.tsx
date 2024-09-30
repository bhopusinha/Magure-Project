import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useNotes from "../hooks/api/useNote";
import { createNote, Note } from "../types/note";
import TextInputForm from "./form/TextInputForm";
import { ApiResponseData } from "../types/api";

interface AddEditNoteClose {
  noteToEdit?: Note | null;
  onDismiss: () => void;
  onNoteSave: (note: Note) => void;
}

const AddNoteDialog = ({onDismiss,onNoteSave,noteToEdit,}: AddEditNoteClose) => {


  const {register,handleSubmit,formState: { errors, isSubmitting },} = useForm<createNote>({defaultValues: {title: noteToEdit?.title || "",text: noteToEdit?.text || "",},});

  const {updateNotes,createNotes}=useNotes();

  async function onSubmit(input: createNote) {
    let noteResponse: ApiResponseData;
    if (noteToEdit) {
         noteResponse=await updateNotes(noteToEdit._id, input);
    } else {
       noteResponse=await createNotes(input);
    }
    console.log(noteResponse);
      onNoteSave(noteResponse.response as Note);
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputForm
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registeroption={{ required: "Required" }}
            error={errors.title}
          />

          <TextInputForm
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteDialog;
