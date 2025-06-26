import mongoose from "mongoose";

// 1- create schema
// 2- a model based off of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
}, 
{ timestamps:true}//with this, mongodb will by default give these -> createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema)

export default Note