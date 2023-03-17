const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// checks if environment is 'production'
const { environment } = require('./config');
const isProduction = environment === 'production';

// starts server
const app = express();

// connect to middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({ 
      policy: "cross-origin" 
    })
  );
  
  // set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

// set up and connect all routes
const routes = require('./routes');
app.use(routes);

module.exports = app;