// booksIndex, booksGetNew, booksPostNew

const booksIndex = async (req, res) => {
  // 1. get all the data
  const sql = `
SELECT books.id, books.title, books.author, books.timeStamp, books.year, book_categories.cat_name AS category
FROM books
LEFT JOIN book_categories
ON book_categories.id = books.category
`;
  const dbResult = await dbAction(sql);
  if (dbResult === false) {
    return dbFail(res);
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
};

module.exports = {
  booksIndex,
};
