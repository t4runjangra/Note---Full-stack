import mongoose from "mongoose";
import { positive, z } from "zod";

export const createNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title cannot exceed 200 characters"),
    content: z
        .string()
        .trim()
        .min(1, "Content body cannot be empty"),
}).strict();

export const updateNoteSchema = createNoteSchema.partial().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided"
})

export const getNotesQuerySchema = z.object({
    search: z.
        string()
        .trim()
        .max(100)
        .optional(),
    sort: z
        .enum(["createdAt", "updatedAt", "title"])
        .default("desc"),
    order: z
        .enum(["asc", "desc"])
        .default("desc"),
    page: z.coerce
        .number()
        .int()
        .positive()
        .default(1),
    limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20)

}).strict()

export const noteIdParamSchema = z.object({
    id: z.string().refine(
        (id) => mongoose.isValidObjectId(id),
        {
            message: "Invalid note ID"
        }
    )
});