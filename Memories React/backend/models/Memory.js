const { text } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const MemorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        src: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        favorite: {
            type: Boolean,
        },
        comments: [ComentSchema] //cada memoria aceita uma lista de comentários
    }, 
    {timestamps: true}
);

module.exports = mongoose.model("Memory", MemorySchema);