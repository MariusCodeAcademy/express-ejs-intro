const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path'); // node module

// const mysql = require('mysql2/promise');
// const dbConfig = require('./dbConfig');

const PORT = process.env.SERVER_PORT || 3000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

// static directory for css, img, js front files
const staticPath = path.join(__dirname, 'assets');
// console.log('staticPath', staticPath);
app.use(express.static(staticPath));

app.get('/', (req, res) => {
  // res.send('<h1>Welcome to Ejs</h1>');
  // send file as a response
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const sampleRoutes = require('./routes/v1/sampleRoute');

app.use('/sample', sampleRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
