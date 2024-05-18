    const Book = require('../model/BookModel');

// POST route to create a new book
const createBook = async (req, res) => {
    try {
        const {
            Book_Name,
            author,
            genre,
            subcategory,
            price,
            publisher,
            publishedDate,
            language,
            ISBN,
            description,
            edition,
            stockQuantity,
            imageUrl,
            featured
        } = req.body;

        const newBook = new Book({
            Book_Name,
            author,
            genre,
            subcategory,
            price,
            publisher,
            publishedDate,
            language,
            ISBN,
            description,
            edition,
            stockQuantity,
            imageUrl,
            featured
        });

        await newBook.save(); // Save the new book to the database

        res.status(201).json({message:res.__('createBook.message1' ),data:newBook});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: res.__('createBook.error1') });
    }
};


    // ______________get all books
    const getAllBook = async (req, res) =>{
        try{
            const books = await Book.find();
            res.json({success: true, data: books, message: res.__('getallbook.message1')})
        } catch(err){
            res.status(500).json({success: false, error: res.__('getAllBook.fail')})
        }
    }

    // _____________get one book
    const getBookbyid = async (req, res)=>{
        try{
            const book = await Book.findById(req.params.id);
            if(!book){
                return res.status(404).json({success: false, error: res.__('getBookById.notFound')})
            }
            res.json({success: true, data: book, message: res.__('getBookById.success')})
        }catch(err){
            res.status(500).json({success: false, error: res.__('getBookById.serverError')})
        }
    }

    // _____________update book by id_____________
    const UpdateBookById = async (req, res)=>{
        try{
            const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if(!book){
                return res.status(404).json({success: false, error: res.__('updateBookById.notFound')});


            }
            res.json({success: true, data:book, message: res.__('updateBookById.success')});
        }catch(err){
            res.status(500).json({success: false, error: res.__('updateBookById.serverError')})
        }
    }

    // ______________delete book by id

    const DeleteBookById = async (req, res)=>{
        try{
            const book = await Book.findByIdAndDelete(req.params.id);
            if(!book){
                return res.status(404).json({success: false, error: res.__('deleteBookById.notFound')});
            }
            res.json({success: true, data: {}, message: res.__('deleteBookById.success')});
        }catch(err){
            res.status(500).json({success: false, error: res.__('deleteBookById.serverError')});
        }
    };

    module.exports = {createBook , getAllBook, getBookbyid, UpdateBookById, DeleteBookById}

