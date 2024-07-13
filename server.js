const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongodb = require('./models/database')

// Load environment variables
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
// const reviewRoutes = require('./routes/reviewRoutes');
// const recommendationRoutes = require('./routes/recommendationRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use("/", require('./routes'));
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
// app.use('/reviews', reviewRoutes);
// app.use('/recommendations', recommendationRoutes);

const port = process.env.PORT || 3000;
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node Running on port ${port}`);
    });
  }
});