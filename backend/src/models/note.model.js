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
    pinnedAt: {
        type: Date,
        default: null
    },
    deletedAt: {
        type: Date,
        default: null
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}
    , {
        timestamps: true
    }
)

noteSchema.index({
    owner: 1,
    pinnedAt: -1,
    updatedAt: -1
});

noteSchema.index({
    title: "text",
    content: "text"
});

export const Note = mongoose.model("Note", noteSchema)