const express = require('express');
const session = require('express-session');
const path = require('path');
const users = require('./users.json');

const app = express();
const port = 5000;

// Store users in memory (for demo)
// const users = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: false
}));

// Authentication check middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.render('login', { error: 'Invalid email or password' });
    console.log("User found:", user);
  }
});

app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  const exists = users.find(u => u.email === email);

  if (exists) {
    res.render('signup', { error: 'User already exists!' });
  } else {
    users.push({ username, email, password });
    console.log("Login attempt:", email, password);
   
    res.redirect('/login');
  }
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
   console.log("Users:", users);
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/login');
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
