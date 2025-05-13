import Book from '../models/Book.js';

// Create book
export const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) res.json(book);
    else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.json(book);
    } else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.json({ message: 'Book deleted' });
    } else res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
