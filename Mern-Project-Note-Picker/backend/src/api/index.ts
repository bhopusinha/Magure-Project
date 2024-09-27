import userRouter from "./user/user.routes";
import noteRouter from "./note/note.routes";

/*her we are exporting all the router */

const add={
    userRouter,
    noteRouter
}

export { userRouter, noteRouter ,add};
