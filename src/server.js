const express = require('express');
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

// Initializations
const app = express();
require('./database');
require('./config/passport');

// Settings
app.set('port', process.env.PORT || 3004);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), "partials"),
    extname: '.hbs',
  }));
app.set("view engine", '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); // Debe ir antes de la configuracion de "passport" y despues de "session"
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user || null;
  if(res.locals.user) res.locals.name = req.user.name;
  next();
});

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/notes.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;