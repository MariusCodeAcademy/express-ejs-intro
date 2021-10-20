const express = require('express');
const { dbAction, dbFail } = require('../../utils/dbHelper');

const router = express.Router();

// GET /books/ - get all books
router.get('/', async (req, res) => {
  // 1. get all the data
  const sql = `
  SELECT books.id, books.title, books.author, books.timeStamp, books.year, book_categories.cat_name AS category
  FROM books
  LEFT JOIN book_categories
  ON book_categories.id = books.category
  `;
  const dbResult = await dbAction(sql);
  if (dbResult === false) {
    return dbFail();
  }
  const books = dbResult;
  // res.json({ msg: 'all books', books });
  // 2. send response page with data
  const data = {
    title: 'Our books',
    currentPage: 'books',
    books,
  };
  res.render('books/index', data);
});

// GET /books/new - show form to add new book
router.get('/new', async (req, res) => {
  const data = {
    title: 'Create book',
    currentPage: 'booksNew',
  };

  res.render('books/new', data);
});

// POST /books/new - process the form

module.exports = router;
