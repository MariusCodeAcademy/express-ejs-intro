const express = require('express');
const { dbAction, dbFail } = require('../../utils/dbHelper');
const booksController = require('../../controllers/booksControllers');

const router = express.Router();

// GET /books/ - get all books
router.get('/', booksController.booksIndex);

// GET /books/new - show form to add new book
router.get('/new', booksController.booksShowForm);

// POST /books/new - process the form
router.post('/new', async (req, res) => {
  const feedback = { msg: '', error: '' };
  // create new book
  const sql = `
  INSERT INTO books (title, author, year, category, image) 
  VALUES (?, ?, ?, ?, 'place.jpg')`;
  const dbResult = await dbAction(sql, Object.values(req.body));
  if (dbResult === false) {
    feedback.error = 'something went wrong';
  } else {
    feedback.msg = 'book created';
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
