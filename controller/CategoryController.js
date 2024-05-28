const Category = require('../model/CategoryModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.KEY;

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, key, { expiresIn: "1h" });
};

// Controller function to create a new Category book
const createCategoryBook = async (req, res) => {
  try {
    const { name,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,
      language,stock,coverImage,ratings,bookId,subCategory } = req.body;

    // Create a new  Category book instance
    const newCategory = new Category({name,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,language,stock,coverImage,ratings,bookId,subCategory});

    
    await newCategory.save();
    const token = createToken(newCategory);

    res.status(201).json({token,newCategory,message: 'Create book successfully'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller function to retrieve category books
const getCategoryBooks = async (req, res) => {
  try {
    // Fetch all category books from the database
    const categoryBooks = await Category.find();
    res.status(200).json(categoryBooks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to retrieve a category by ID
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Fetch the category from the database by ID
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports ={createCategoryBook, getCategoryBooks, getCategoryById}