import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { type } from "os";

const userSchema = new mongoose.Schema({

    // Username field
    avatar: {
        url: {
            type: String,
            default: null,
        },
        publicId: {
            type: String,
            default: null,
        },
    },
    coverAvatar: {
        url: {
            type: String,
            default: null
        },
        publicId: {
            type: String,
            default: null,
        },
    },
    username: {
        type: String,          
        unique: true,          
        required: true,        
        lowercase: true,       
        trim: true             
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },


    password: {
        type: String,
        required: [true, "Password is required"]

    },
    refreshToken: {
        type: String
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpiry: {
        type: Date
    },
    emailVerificationToken: {
        type: String,
        default: null
    },

    emailVerificationExpiry: {
        type: Date,
        default: null
    },
    fullName: {
        type: String,
        default: "",
        trim: true,
    },

    bio: {
        type: String,
        default: "",
        maxlength: 250,
        trim: true,
    },

    github: {
        type: String,
        default: "",
        trim: true,
    },

    linkedin: {
        type: String,
        default: "",
        trim: true,
    },

    website: {
        type: String,
        default: "",
        trim: true,
    },

    location: {
        type: String,
        default: "",
        trim: true,
    },

})


userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password, this.password)

}
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);

    console.log("Pre middleware executed");
});

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        id: this._id,
        username: this.username,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}


export const User = mongoose.model("User", userSchema);
