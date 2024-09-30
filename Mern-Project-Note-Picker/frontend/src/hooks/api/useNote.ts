import { createNote, Note as NoteModal, updateNote } from "../../types/note";
import {useHttpMethodContext } from "../../context/HttpProvider";
import { ApiResponseData } from "../../types/api";

const useNotes = () => {

  const {get,post,patch,deleteMe} = useHttpMethodContext();


   const fetchNotes = async (showLoader=true): Promise<ApiResponseData> => {

      const response = await get(`/api/notes`,showLoader);
      return response;
    
  }; 
  
  const createNotes = async (input: createNote,showLoader=true): Promise<ApiResponseData> => {
      const noteResponse = await post("/api/notes/add", input,showLoader);
  
      return noteResponse;
  };

  const deleteNote = async(note: NoteModal,showLoader=true ): Promise<ApiResponseData>=> {
  
      const response =  await deleteMe(`/api/notes/${note._id}`,showLoader);
  
      return response;
    }


  const updateNotes=async (noteId: string, noteInput: updateNote,showLoader=true):Promise<ApiResponseData>=>{
     
    const response=await patch(`/api/notes/${noteId}`, noteInput,showLoader);

    return response

  }
  
  return {
    fetchNotes,
    createNotes,
    updateNotes,
    deleteNote
  }

};

export default useNotes;
