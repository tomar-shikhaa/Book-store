// Import Mongoose
const mongoose = require('mongoose');

// Define a schema for books
const bookSchema = new mongoose.Schema({

    Book_Name: {
        type: String,
        // required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    edition: {
        type: String
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },

});

// Create a model from the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
