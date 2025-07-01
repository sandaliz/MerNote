import mongoose from "mongoose";

// 1- create schema
// 2- a model based off of that schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true } // gives createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

export default User;
