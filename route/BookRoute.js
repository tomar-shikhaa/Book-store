// Import required modules
const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');

// Create a new book
router.post('/books', bookController.createBook);

// Get all books
router.get('/books', bookController.getAllBook);

// Get a single book by ID
router.get('/books/:id', bookController.getBookbyid);

// Update a book by ID
router.put('/books/:id', bookController.UpdateBookById);

// Delete a book by ID
router.delete('/books/:id', bookController.DeleteBookById);

module.exports = router;
