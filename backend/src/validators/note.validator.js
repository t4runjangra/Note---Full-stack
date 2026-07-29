import { z } from "zod";

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