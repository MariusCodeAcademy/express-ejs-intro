const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); // node module

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// set engine, defaul directory /views
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

// static directory for css, img, js front files
const staticPath = path.join(__dirname, 'assets');
// console.log('staticPath', staticPath);
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home page', currentPage: 'home' });
});

app.get('/about', (req, res) => {
  // got to db, fetch data
  const points = ['Html', 'Css', 'Js'];
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(403).send('Forbiden, please log in');
  }
  // pass data
  res.render('about', {
    points: points,
    title: 'About Us All',
    currentPage: 'about',
  });
});

const users = require('./db/users');
// console.log('users', users);
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact us today', users });
});

app.get('/layout', (req, res) => {
  res.render('mainLayout', { title: 'layout', asideOn: true });
});

const booksRoutes = require('./routes/v1/booksRoutes');

app.use('/books', booksRoutes);

// 404 not found url
app.all('*', (req, res) => {
  res.status(404).send('OOPS page not found');
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
