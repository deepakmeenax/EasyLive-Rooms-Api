const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const connectDB = require('./mongodb');

// load env vars
dotenv.config({ path: './config/config.env' });

require('./utils/passport')(passport)

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// set up session cookies
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection: mongoose.connection})
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes/rooms'));
app.use(require('./routes/auth'));
app.use(require('./routes/user'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);