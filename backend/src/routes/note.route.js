import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, getNotes, updateNote , pinNote, unpinNote,trashNote, restoreNote, permanentDeleteNote } from "../controllers/note.controller.js";
import { createNoteSchema, updateNoteSchema, noteIdParamSchema, getNotesQuerySchema } from "../validators/note.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
const noteRouter = Router()

noteRouter.post("/note",
    verifyJWT,
    validate(createNoteSchema),
    createNote
)
noteRouter.get(
    "/note",
    verifyJWT,
    validate(getNotesQuerySchema, "query"),
    getNotes
);
noteRouter.patch(
    "/note/:id",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    validate(updateNoteSchema),
    updateNote
);
noteRouter.delete(
    "/note/:id",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    deleteNote
);
noteRouter.patch(
    "/note/:id/pin",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    pinNote
);

noteRouter.patch(
    "/note/:id/unpin",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    unpinNote
);

noteRouter.patch(
    "/note/:id/trash",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    trashNote
);

noteRouter.patch(
    "/note/:id/restore",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    restoreNote
);

noteRouter.delete(
    "/note/:id/permanent",
    verifyJWT,
    validate(noteIdParamSchema, "params"),
    permanentDeleteNote
);
export default noteRouter

