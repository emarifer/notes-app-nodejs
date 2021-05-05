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
app.locals.prefixApp = process.env.PREFIX_APP;
const prefix = `${process.env.PREFIX_APP}`.length !== 0 ? `${process.env.PREFIX_APP}` : '/';
require('./database');
require('./config/passport');
global.process.e

// Settings
app.set('port', process.env.PORT || 3004);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), "partials"),
    extname: '.hbs',
    helpers: {
      normalizer: () => prefix
    }
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
});// VER NOTA-2 ABAJO:

// Routes
app.use(process.env.PREFIX_APP, require('./routes/index.routes'));
app.use(process.env.PREFIX_APP, require('./routes/users.routes'));
app.use(process.env.PREFIX_APP, require('./routes/notes.routes'));

// Static Files
// VER NOTA-1 ABAJO:
app.use(process.env.PREFIX_APP, express.static(path.join(__dirname, 'public')));

module.exports = app;

/* 
  NOTA-1. REDUCIR TODAS LAS RUTAS A UN "NIVEL DE PROFUNDIDAD"; SI NO SE PUEDE PORQUE, P.EJ., HAYA PARAMETROS EN LA RUTA EN ESE PARTIALS DE HANDLEBARS HABRA QUE VOLVER A COLOCAR EL CSS Y EL FAVICON. VER:
  https://stackoverflow.com/questions/34597072/express-static-not-working-for-subdirectory#34597221
  https://stackoverflow.com/questions/42641992/sub-routes-in-main-route-not-getting-static-files-expressjs#42643196
  NOTA-2. VER:
  https://stackoverflow.com/questions/35111143/express4-whats-the-difference-between-app-locals-res-locals-and-req-app-local/35111195
  NOTA-3. SOBRE HELPERS EN EXPRESS-HANDLEBARS. VER:
  https://www.npmjs.com/package/express-handlebars#helpers
*/