import mongoose from "mongoose";
import { Note } from "../models/note.model.js";
import { apiError } from "../utils/api.error.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createNote = asyncHandler(
    async (req, res) => {
        const { title, content } = req.body

        const note = await Note.create({
            title,
            content,
            owner: req.user.id
        })
        return res.status(201)
            .json(
                new apiResponse(201, note, "Note created successfully")
            )

    }
)



export const getNotes = asyncHandler(
    async (req, res) => {
        const {
            search,
            sort,
            order,
            page,
            limit
        } = req.validated.query;
        
        const sortOrder = order === "asc" ? 1 : -1;

        const skip = (page - 1) * limit;

        const query = {
            owner: req.user.id
        };
        if (search) {
            query.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    content: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        const notes = await Note.find(query).sort({
            [sortField]: sortOrder
        }).skip(skip).limit(limit)

        const totalNotes = await Note.countDocuments(query);
        const totalPages = Math.ceil(totalNotes / limit);
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return res.status(200).json(
            new apiResponse(
                200,
                {
                    notes,
                    pagination: {
                        page,
                        limit,
                        totalNotes,
                        totalPages,
                        hasNextPage,
                        hasPreviousPage
                    }
                },
                "Notes fetched successfully"
            )
        )
    }
)


export const updateNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    if (!mongoose.isValidObjectId(noteId)) {
        throw new apiError(400, "Invalid note ID");
    }
    if (!noteId) throw new apiError(400, "Note ID is required")


    const { title, content } = req.body;


    const note = await Note.findOne({

        _id: noteId,
        owner: req.user.id

    });

    if (!note) throw new apiError(404, "Note not found")

    if (title !== undefined) {
        note.title = title;
    }

    if (content !== undefined) {
        note.content = content;
    }

    await note.save();

    return res.status(200).json(
        new apiResponse(200, note, "Note updated successfully")

    );
})

export const deleteNote = asyncHandler(async (req, res) => {
    const noteId = req.params.id;

    if (!mongoose.isValidObjectId(noteId)) {
        throw new apiError(400, "Invalid note ID");
    }
    if (!noteId) throw new apiError(400, "Note ID is required")



    const note = await Note.findOneAndDelete({
        _id: noteId,
        owner: req.user.id,
    });

    if (!note) throw new apiError(404, "Note not found")

    return res.status(200).json(
        new apiResponse(200, null, "Note deleted successfully")
    )
})