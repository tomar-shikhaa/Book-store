// Import required modules
const express = require('express');
const router = express.Router();
const bookController = require('../controller/BookController');
const authorization = require('../middleware/Authorization');

// Create a new book
router.post('/books', authorization.authenticateToken, bookController.createBook);

// Get all books
router.get('/books', authorization.authenticateToken, bookController.getAllBook);

// Get a single book by ID
router.get('/books/:id',authorization.authenticateToken, bookController.getBookbyid);

// Update a book by ID
router.put('/books/:id',authorization.authenticateToken, bookController.UpdateBookById);

// Delete a book by ID
router.delete('/books/:id',authorization.authenticateToken, bookController.DeleteBookById);

module.exports = router;
