require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initialize App
const app = express();

// Initialize DataBase Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true }, () => {
  console.log('Connected to MongoDB');
});
const db = mongoose.connection;

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Init Passport
app.use(passport.initialize());

// Routes
const ngosRoutes = require('./routes/ngos');
const causesRoutes = require('./routes/causes');
const usersRoutes = require('./routes/users');
const commentsRoutes = require('./routes/comments');

app.use('/ngos', ngosRoutes);
app.use('/causes', causesRoutes);
app.use('/users', usersRoutes);
app.use('/comments', commentsRoutes);

module.exports = app;
