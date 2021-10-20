const express = require('express');
const { dbAction, dbFail } = require('../../utils/dbHelper');

const router = express.Router();

// GET /books/ - get all books
router.get('/', async (req, res) => {
  // 1. get all the data
  const sql = 'SELECT * FROM books';
  const dbResult = await dbAction(sql);
  if (dbResult === false) {
    return dbFail();
  }
  const books = dbResult;
  // res.json({ msg: 'all books', books });
  // 2. send response page with data
  res.render('books/index', { books });
});

module.exports = router;
