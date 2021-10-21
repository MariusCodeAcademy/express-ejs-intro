const express = require('express');
const { dbAction, dbFail } = require('../../utils/dbHelper');
const booksController = require('../../controllers/booksControllers');

const router = express.Router();

// GET /books/ - get all books
router.get('/', booksController.booksIndex);

// GET /books/new - show form to add new book
router.get('/new', async (req, res) => {
  // get categories for select
  const sql = 'SELECT * from book_categories';
  const categories = await dbAction(sql);
  console.log('categories', categories);
  const data = {
    title: 'Create book',
    currentPage: 'booksNew',
    categories: categories,
  };

  res.render('books/new', data);
});

// POST /books/new - process the form
router.post('/new', async (req, res) => {
  let feedback = { msg: '', kind: '' };
  // create new book
  const sql = `
  INSERT INTO books (title, author, year, category, image) 
  VALUES (?, ?, ?, ?, 'place.jpg')`;
  const dbResult = await dbAction(sql, Object.values(req.body));
  if (dbResult === false) {
    feedback = { msg: 'something went wrong', kind: 'error' };
  } else {
    feedback = { msg: 'book created', kind: 'success' };
  }
  // resrs.send({ msg: 'book created', dbResult });

  const data = {
    title: 'Create book',
    currentPage: 'booksNew',
    feedback: feedback,
  };
  res.render('books/new', data);
});

module.exports = router;
