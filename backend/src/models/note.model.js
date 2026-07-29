import mongoose, { Schema } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
}
    , {
        timestamps: true
    }
)

export const Note = mongoose.model("Note", noteSchema)