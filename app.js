const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// set up view engines
app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

// set up Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3000, () => {
  console.log('app now listening for requests on port 3000');
});