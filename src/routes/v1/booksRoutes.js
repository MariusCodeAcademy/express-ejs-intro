const express = require('express');

const router = express.Router();

const mysql = require('mysql2/promise');
const dbConfig = require('../../dbConfig');

// GET /books/ - get all books
router.get('/', async (req, res) => {
  // 1. get all the data
  const books = '';
  // 2. send response page with data
  res.render('pages/books', data);
  // res.json({msg: 'all books', data});
});

module.exports = router;
