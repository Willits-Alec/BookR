const mongodb = require("../models/database");
const ObjectId = require("mongodb").ObjectId;

const getAllBooks = async (req, res) => {
  //#swagger.tags=['Books']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .find();
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((books) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(books);
    });
};

const getBookById = async (req, res) => {
  //#swagger.tags=['Books']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid book id to update the book details.");
  }
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .find({ _id: userId });
  result
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
    })
    .then((professors) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(professors[0]);
    });
};

const createBook = async (req, res) => {
  //#swagger.tags=['Books']
  const book = {
    bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    publication_date: req.body.publication_date,
    average_rating: req.body.average_rating,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .insertOne(book);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the books.");
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags=['Books']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid book id to update the book details.");
  }
  const bookId = new ObjectId(req.params.id);
  const book = {
    bookId: req.body.bookId,
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    publication_date: req.body.publication_date,
    average_rating: req.body.average_rating,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .replaceOne({ _id: bookId }, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occured while updating the books.");
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags=['Books']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid book id to update the book details.");
  }
  const bookId = new ObjectId(req.params.id);
  try {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("books")
      .deleteOne({ _id: bookId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("book not found");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json("Some error occurred while deleting the book.");
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};






/* const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ bookId: req.params.id });
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate({ bookId: req.params.id }, req.body, { new: true });
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ bookId: req.params.id });
    if (book == null) {
      return res.status(404).json({ message: 'Cannot find book' });
    }
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
*/
